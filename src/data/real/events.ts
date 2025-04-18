import EventImage1 from '@assets/events/projects-event-image-1.jpeg';
import EventImage2 from '@assets/events/projects-event-image-2.jpeg';
import EventImage3 from '@assets/events/projects-event-image-3.jpeg';
import { getImage } from 'astro:assets';
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
  get3CalendarEntries,
  getAllPages,
  getAllYearlyEvents,
};

type EventRequest = {
  draft: boolean;
  limit?: number;
  sort?: `-${keyof EventCMS}` | keyof EventCMS;
  where: {
    [key in keyof EventCMS]?: {
      greater_than?: EventCMS[key];
      less_than?: EventCMS[key];
    };
  };
};

const DRAFT = process.env.PREVIEW_DEPLOYMENT === 'true';

export async function get3CalendarEntries(): Promise<
  [EventCalendarEntry, EventCalendarEntry, EventCalendarEntry]
> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const request: EventRequest = {
    draft: DRAFT,
    limit: 3,
    sort: 'start',
    where: {
      start: {
        greater_than: today.toISOString(),
      },
    },
  };
  console.log(request);
  console.log(`${process.env.CMS_URL}/api/events?${qs.stringify(request)}`);
  const response = await fetch(`${process.env.CMS_URL}/api/events?${qs.stringify(request)}`);
  const data = await response.json();
  let events = data.docs as EventCMS[];
  if (events.length < 3) {
    // If there are less than 3 events in the future, we want to fill the remaining slots with past events
    const request2: EventRequest = {
      draft: DRAFT,
      limit: 3 - events.length,
      sort: '-start',
      where: {
        start: {
          less_than: today.toISOString(),
        },
      },
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
    date: new Date(event.start),
    description: event.shortDescription,
    image: await getEventImage(event.calendarCover.value).then(async (r) => ({
      alt: r!.alt,
      src: await getImage({
        ...r!,
        widths: [300, 721, 920, 1080, 1244, 1430, 1590, 1730, 1866, 1960, 2040, r!.width],
      }),
    })),
    link: event.slug ? `/events/${event.slug}` : null,
    title: event.title,
  })) as [Promise<EventCalendarEntry>, Promise<EventCalendarEntry>, Promise<EventCalendarEntry>];
  return Promise.all(optimizedEvents);
}

export async function getAllPages(): Promise<EventPage[]> {
  const response = await fetch(`${process.env.CMS_URL}/api/events?draft=${DRAFT}`);
  const data = await response.json();
  const events = data.docs as EventCMS[];
  const eventsWithSlug = events.filter((event) => event.slug);
  const promises = eventsWithSlug.map(async (event) => ({
    ...event,
    end: new Date(event.end),
    heroImage: await getEventImage(event.heroImage?.value),
    sponsorLogo: await getEventImage(event.sponsorLogo?.value),
    start: new Date(event.start),
    team: await Promise.all(
      event.team?.map(async (t) => ({
        ...t,
        image: await getEventImage(t.image?.value),
      })) || [],
    ),
    timetable: await getEventImage(event.timetable?.value),
  })) as Promise<EventPage>[];
  const result = await Promise.all(promises);
  return result;
}

export async function getAllYearlyEvents(): Promise<YearlyEvent[]> {
  return [
    {
      day: '2',
      for_all: true,
      image: {
        alt: 'Eine Gruppe Menschen sitzt in einer Reihe.',
        ...(await getYearlyEventImage(EventImage1)),
      },
      month: 'September',
      short_description:
        'Unsere jährliche Sommerveranstaltung ist für viele das Highlight des Jahres!',
      slug: 'summer-gathering',
      title: 'Sommer Gathering',
    },
    {
      day: '31',
      for_all: true,
      image: {
        alt: 'Menschen sitzen an einem Holztisch und spielen ein Kartenspiel im Garten.',
        ...(await getYearlyEventImage(EventImage2)),
      },
      month: 'Dezember',
      short_description:
        'Lass uns das vergangene Jahr ausklingen lassen und gemeinsam in das neue Jahr starten!',
      slug: 'silvester',
      title: 'Silvester',
    },
    {
      day: '4',
      for_all: false,
      image: {
        alt: 'Ein großer Kuschelhaufen liegt vor einer Frau die Ukulele spielt.',
        ...(await getYearlyEventImage(EventImage3)),
      },
      month: 'April',
      short_description:
        'Werde Mitglied und entscheide gemeinsam über die Zukunft von YoungVision!',
      slug: 'mitgliederversammlung',
      title: 'Mitgliederversammlung',
    },
  ];
}

export async function getEventImage(
  image: Media | string | undefined,
): Promise<null | RemoteImage> {
  if (!image) {
    return null;
  } else if (typeof image === 'string') {
    throw new Error(
      'Image is a string, but should be a Media object. (Maybe wrong depth in the query?)',
    );
  } else {
    return {
      alt: image.altText,
      height: image.height!,
      src: `${process.env.CMS_URL}${image.url}`,
      width: image.width!,
    };
  }
}

async function getYearlyEventImage(src: Parameters<typeof getImage>[0]['src']) {
  return getImage({ src, widths: [665, 1080, 1380, 1620, 1810, 1980] });
}
