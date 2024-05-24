import { getImage } from 'astro:assets';

import calendarCoverImage from '@assets/events/calendar-cover.jpeg';
import pastEvent from '@assets/events/calendar-past-event.jpeg';
import thirdEventImage from '@assets/events/calendar-third-event.jpeg';

import EventImage1 from '@assets/events/projects-event-image-1.jpeg';
import EventImage2 from '@assets/events/projects-event-image-2.jpeg';
import EventImage3 from '@assets/events/projects-event-image-3.jpeg';

import type { GetImageResult } from 'astro';
import qs from 'qs';
import type { Address, Event as EventCMS, Media } from './payload-types.ts';

export interface EventCalendarEntry {
  title: string;
  date: Date;
  description: string;
  link?: string;
  image: YVImage;
}

export interface EventPage {
  title: string;
  start: Date;
  end: Date;
  slug: string;
  content_html: string;
  heroImage: YVImage;
  address: Address;
  audience: string;
  cost: string;
  team: { name: string; job: string; bio: string; image: YVImage }[];
  registrationLink: string;
  timetable?: YVImage;
}

export type YVImage = {
  src: GetImageResult;
  alt: string;
};

export async function getAllEvents(): Promise<EventPage[]> {
  if (process.env.PLAYWRIGHT_TEST === 'true') {
    return [
      {
        title: 'Event 1',
        start: new Date(),
        end: new Date(),
        slug: 'event-1',
        content_html: 'Some content',
        heroImage: {
          src: await getImage({ src: calendarCoverImage, width: 2200, height: 2200 }),
          alt: 'Leute sitzen am Tisch',
        },
        address: {
          street: 'Musterstraße 1',
          zip: '12345',
          city: 'Musterstadt',
        },
        audience: 'Alle',
        cost: 'Kostenlos',
        team: [],
        registrationLink: 'https://example.com',
      },
    ];
  }
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

export async function getNext3Events(): Promise<
  [EventCalendarEntry, EventCalendarEntry, EventCalendarEntry]
> {
  if (process.env.PLAYWRIGHT_TEST === 'true') {
    const image1 = await getImage({ src: thirdEventImage });
    const image2 = await getImage({ src: calendarCoverImage });
    const image3 = await getImage({ src: pastEvent });
    return [
      {
        title: 'Past Event',
        date: new Date(1999, 6, 10),
        description: 'This event covers the test case for past events',
        link: '/events/bauwoche-2024',
        image: {
          src: image1,
          alt: '',
        },
      },
      {
        title: 'Future Event 1',
        date: new Date(2999, 10, 2),
        description: 'This event will always (until the year 2999) be in the future.',
        link: '/events/bauwoche-2024',
        image: {
          src: image2,
          alt: '',
        },
      },
      {
        title: 'Future Event 2',
        date: new Date(3024, 0, 28),
        description: 'This is test data. Test 1 2 3. Test test.',
        image: {
          src: image3,
          alt: '',
        },
      },
    ];
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const request = {
    sort: 'date',
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

export async function getEventImage(image: string | Media | undefined): Promise<YVImage | null> {
  if (!image) {
    return null;
  } else if (typeof image === 'string') {
    throw new Error(
      'Image is a string, but should be a Media object. (Maybe wrong depth in the query?)',
    );
  } else {
    console.log('event.calendarCover.value', image);
    return {
      src: await getImage({
        src: `${process.env.CMS_URL}${image.url}`,
        width: image.width,
        height: image.height,
      }),
      alt: image.altText,
    };
  }
}

export type YVEvent = {
  slug: string;
  title: string;
  day: string;
  month: string;
  short_description: string;
  image: {
    src: Awaited<ReturnType<typeof getImage>>;
  };
  for_all: boolean;
  future?: string;
};

export async function getEventBySlug(slug: string): Promise<YVEvent | undefined> {
  const allEvents = await getAllYearlyEvents();
  return allEvents.find((e) => e.slug === slug);
}

export async function getAllYearlyEvents(): Promise<YVEvent[]> {
  if (process.env.PLAYWRIGHT_TEST === 'true') {
    return [
      {
        slug: 'event-1',
        title: 'Event 1',
        day: '1',
        month: 'Januar',
        short_description: 'Das ist ein Test Event. Komm nicht vorbei, weil es ist nicht real.',
        image: { src: await getImage({ src: EventImage1 }) },
        for_all: true,
      },
      {
        slug: 'event-2',
        title: 'Event 2',
        day: '31',
        month: 'Oktober',
        short_description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium, felis sed luctus tempor',
        image: { src: await getImage({ src: EventImage2 }) },
        for_all: true,
      },
      {
        slug: 'event-3',
        title: 'Event 3',
        day: '24',
        month: 'Mai',
        short_description: 'Noch ein Test Event, aber nur für Mitglieder !!!1!!11!111elf1',
        image: { src: await getImage({ src: EventImage3 }) },
        for_all: false,
      },
    ];
  }
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
