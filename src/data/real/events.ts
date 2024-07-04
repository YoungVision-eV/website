import { getImage } from 'astro:assets';

import EventImage1 from '@assets/events/projects-event-image-1.jpeg';
import EventImage2 from '@assets/events/projects-event-image-2.jpeg';
import EventImage3 from '@assets/events/projects-event-image-3.jpeg';
import qs from 'qs';
import type {
  EventCalendarEntry,
  EventData,
  EventPage,
  ImageWithAlt,
  YearlyEvent,
} from '../index.ts';
import type { Event as EventCMS, Media } from '../payload-types.ts';

export const realEventData: EventData = {
  getAllPages,
  get3CalendarEntries,
  getAllYearlyEvents,
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
  })) as Promise<EventPage>[];
  const result = await Promise.all(promises);
  return result;
}

export async function get3CalendarEntries(): Promise<
  [EventCalendarEntry, EventCalendarEntry, EventCalendarEntry]
> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const request = {
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
    const request2 = {
      sort: '-date',
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
    events = pastEvents.reverse().concat(events);
  }
  const promises = events.map(async (event) => ({
    title: event.title,
    date: new Date(event.start),
    description: event.shortDescription,
    link: event.slug ? `/events/${event.slug}` : null,
    image: await getEventImage(event.calendarCover.value),
  })) as [Promise<EventCalendarEntry>, Promise<EventCalendarEntry>, Promise<EventCalendarEntry>];
  const result = await Promise.all(promises);
  return result;
}

async function getEventImage(image: string | Media | undefined): Promise<ImageWithAlt | null> {
  if (!image) {
    return null;
  } else if (typeof image === 'string') {
    throw new Error(
      'Image is a string, but should be a Media object. (Maybe wrong depth in the query?)',
    );
  } else {
    console.log('event.calendarCover.value', image);
    // mimetype looks like image/svg+xml sometimes, so we only want the svg part
    const format = image.mimeType!.split('/')[1].split('+')[0] as ImageMetadata['format'];
    return {
      src: {
        src: `${process.env.CMS_URL}${image.url}`,
        width: image.width!,
        height: image.height!,
        format,
      },
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
