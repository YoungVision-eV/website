import { getImage } from 'astro:assets';

import EventImage1 from '@assets/events/projects-event-image-1.jpeg';
import EventImage2 from '@assets/events/projects-event-image-2.jpeg';
import EventImage3 from '@assets/events/projects-event-image-3.jpeg';
import qs from 'qs';
import type {
  EventCalendarEntry,
  EventData,
  EventPage,
  RemoteImage,
  YearlyEvent,
} from '../index.ts';
import type { Event as EventCMS, Media } from '../payload-types.ts';

export const realEventData: EventData = {
  getAllPages,
  get3CalendarEntries,
  getAllYearlyEvents,
};

type EventRequest = {
  sort?: keyof EventCMS | `-${keyof EventCMS}`;
  where: {
    [key in keyof EventCMS]?: {
      greater_than?: EventCMS[key];
      less_than?: EventCMS[key];
    };
  };
  limit?: number;
};

export async function getAllPages(): Promise<EventPage[]> {
  const response = await fetch(`${process.env.CMS_URL}/api/events`);
  const data = await response.json();
  const events = data.docs as EventCMS[];
  const eventsWithSlug = events.filter((event) => event.slug);
  const promises = eventsWithSlug.map(async (event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
    team: await Promise.all(
      event.team?.map(async (t) => ({
        ...t,
        image: await getEventImage(t.image?.value),
      })) || [],
    ),
    heroImage: await getEventImage(event.heroImage?.value),
    timetable: await getEventImage(event.timetable?.value),
    sponsorLogo: await getEventImage(event.sponsorLogo?.value),
  })) as Promise<EventPage>[];
  const result = await Promise.all(promises);
  return result;
}

export async function get3CalendarEntries(): Promise<
  [EventCalendarEntry, EventCalendarEntry, EventCalendarEntry]
> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const request: EventRequest = {
    sort: 'start',
    where: {
      start: {
        greater_than: today.toISOString(),
      },
    },
    limit: 3,
  };
  const response = await fetch(`${process.env.CMS_URL}/api/events?${qs.stringify(request)}`);
  const data = await response.json();
  let events = data.docs as EventCMS[];
  console.log('events', events);
  if (events.length < 3) {
    // If there are less than 3 events in the future, we want to fill the remaining slots with past events
    const request2: EventRequest = {
      sort: '-start',
      where: {
        start: {
          less_than: today.toISOString(),
        },
      },
      limit: 3 - events.length,
    };
    const pastEventsResponse = await fetch(
      `${process.env.CMS_URL}/api/events?${qs.stringify(request2)}`,
    );
    const pastEventsData = await pastEventsResponse.json();
    const pastEvents = pastEventsData.docs as EventCMS[];
    // Reverse the past events so they appear in the correct order
    // after we've sorted them in the wrong order to get the most recent ones
    events = pastEvents.reverse().concat(events);
  }
  const optimizedEvents = events.map(async (event) => ({
    title: event.title,
    date: new Date(event.start),
    description: event.shortDescription,
    link: event.slug ? `/events/${event.slug}` : null,
    image: await getEventImage(event.calendarCover.value).then(async (r) => ({
      src: await getImage({
        ...r!,
        widths: [300, 622, 980, 1244, 1560, 1810, 2040, r!.width],
      }),
      alt: r!.alt,
    })),
  })) as [Promise<EventCalendarEntry>, Promise<EventCalendarEntry>, Promise<EventCalendarEntry>];
  return Promise.all(optimizedEvents);
}

export async function getEventImage(
  image: string | Media | undefined,
): Promise<RemoteImage | null> {
  if (!image) {
    return null;
  } else if (typeof image === 'string') {
    throw new Error(
      'Image is a string, but should be a Media object. (Maybe wrong depth in the query?)',
    );
  } else {
    console.log('event.calendarCover.value', image);
    return {
      src: `${process.env.CMS_URL}${image.url}`,
      width: image.width!,
      height: image.height!,
      alt: image.altText,
    };
  }
}

export async function getAllYearlyEvents(): Promise<YearlyEvent[]> {
  return [
    {
      slug: 'summer-gathering',
      title: 'Sommer Gathering',
      day: '2',
      month: 'September',
      short_description:
        'Unsere jährliche Sommerveranstaltung ist für viele das Highlight des Jahres!',
      image: { src: await getImage({ src: EventImage1 }) },
      for_all: true,
    },
    {
      slug: 'silvester',
      title: 'Silvester',
      day: '31',
      month: 'Dezember',
      short_description:
        'Lass uns das vergangene Jahr ausklingen lassen und gemeinsam in das neue Jahr starten!',
      image: { src: await getImage({ src: EventImage2 }) },
      for_all: true,
    },
    {
      slug: 'mitgliederversammlung',
      title: 'Mitgliederversammlung',
      day: '4',
      month: 'April',
      short_description:
        'Werde Mitglied und entscheide gemeinsam über die Zukunft von YoungVision!',
      image: { src: await getImage({ src: EventImage3 }) },
      for_all: false,
    },
  ];
}
