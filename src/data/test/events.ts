import { getImage } from 'astro:assets';

import type { GetImageResult } from 'astro';

import calendarCoverImage from '@assets/events/calendar-cover.jpeg';
import pastEvent from '@assets/events/calendar-past-event.jpeg';
import thirdEventImage from '@assets/events/calendar-third-event.jpeg';

import EventImage1 from '@assets/events/projects-event-image-1.jpeg';
import EventImage2 from '@assets/events/projects-event-image-2.jpeg';
import EventImage3 from '@assets/events/projects-event-image-3.jpeg';
import type { EventCalendarEntry, EventData, EventPage } from '../index.ts';

export const testEventData: EventData = {
  getAllPages,
  get3CalendarEntries,
  getAllYearlyEvents,
};

export async function getAllPages(): Promise<EventPage[]> {
  return [
    {
      title: 'Event 1',
      start: new Date(),
      end: new Date(),
      slug: 'event-1',
      contentTitle: 'Dein Event 1',
      content_html: 'Some content',
      heroImage: {
        ...calendarCoverImage,
        alt: 'Leute sitzen am Tisch',
      },
      address: {
        street: 'Musterstraße 1',
        zip: '12345',
        city: 'Musterstadt',
      },
      audience: 'Alle',
      cost: 'Kostenlos',
      team: [
        {
          name: 'Erika Mustermann',
          job: 'Some job',
          bio: 'Thats my life',
          image: {
            src: 'https://placehold.co/500',
            width: 500,
            height: 500,
            alt: 'Portait von Erika Mustermann',
          },
        },
      ],
      registrationLink: 'https://example.com',
    },
  ];
}

export async function get3CalendarEntries(): Promise<
  [EventCalendarEntry, EventCalendarEntry, EventCalendarEntry]
> {
  return [
    {
      title: 'Past Event',
      date: new Date(1999, 6, 10),
      description: 'This event covers the test case for past events',
      link: '/events/bauwoche-2024',
      image: {
        src: await getImage({ src: thirdEventImage }),
        alt: '',
      },
    },
    {
      title: 'Future Event 1',
      date: new Date(2999, 10, 2),
      description: 'This event will always (until the year 2999) be in the future.',
      link: '/events/bauwoche-2024',
      image: {
        src: await getImage({ src: calendarCoverImage }),
        alt: '',
      },
    },
    {
      title: 'Future Event 2',
      date: new Date(3024, 0, 28),
      description: 'This is test data. Test 1 2 3. Test test.',
      image: {
        src: await getImage({ src: pastEvent }),
        alt: '',
      },
    },
  ];
}

export type YVEvent = {
  slug: string;
  title: string;
  day: string;
  month: string;
  short_description: string;
  image: {
    src: GetImageResult;
  };
  for_all: boolean;
  future?: string;
};

export async function getAllYearlyEvents(): Promise<YVEvent[]> {
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
