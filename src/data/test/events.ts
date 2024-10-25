import calendarCoverImage from '@assets/events/calendar-cover.jpeg';
import pastEvent from '@assets/events/calendar-past-event.jpeg';
import thirdEventImage from '@assets/events/calendar-third-event.jpeg';
import EventImage1 from '@assets/events/projects-event-image-1.jpeg';
import EventImage2 from '@assets/events/projects-event-image-2.jpeg';
import EventImage3 from '@assets/events/projects-event-image-3.jpeg';
import { getImage } from 'astro:assets';

import type { EventCalendarEntry, EventData, EventPage, YearlyEvent } from '../index.ts';

export const testEventData: EventData = {
  get3CalendarEntries,
  getAllPages,
  getAllYearlyEvents,
};

export async function get3CalendarEntries(): Promise<
  [EventCalendarEntry, EventCalendarEntry, EventCalendarEntry]
> {
  return [
    {
      date: new Date(1999, 6, 10),
      description: 'This event covers the test case for past events',
      image: {
        alt: '',
        src: await getImage({ src: thirdEventImage }),
      },
      link: '/events/bauwoche-2024',
      title: 'Past Event',
    },
    {
      date: new Date(2999, 10, 2),
      description: 'This event will always (until the year 2999) be in the future.',
      image: {
        alt: '',
        src: await getImage({ src: calendarCoverImage }),
      },
      link: '/events/bauwoche-2024',
      title: 'Future Event 1',
    },
    {
      date: new Date(3024, 0, 28),
      description: 'This is test data. Test 1 2 3. Test test.',
      image: {
        alt: '',
        src: await getImage({ src: pastEvent }),
      },
      title: 'Future Event 2',
    },
  ];
}

export async function getAllPages(): Promise<EventPage[]> {
  return [
    {
      address: {
        city: 'Musterstadt',
        street: 'Musterstraße 1',
        zip: '12345',
      },
      audience: 'Alle',
      content_html: 'Some content',
      contentTitle: 'Dein Event 1',
      cost: 'Kostenlos',
      end: new Date(),
      heroImage: {
        ...calendarCoverImage,
        alt: 'Leute sitzen am Tisch',
      },
      registrationLink: 'https://example.com',
      slug: 'event-1',
      start: new Date(),
      team: [
        {
          bio: 'Thats my life',
          image: {
            alt: 'Portait von Erika Mustermann',
            height: 500,
            src: 'https://placehold.co/500',
            width: 500,
          },
          job: 'Some job',
          name: 'Erika Mustermann',
        },
      ],
      title: 'Event 1',
    },
  ];
}

export async function getAllYearlyEvents(): Promise<YearlyEvent[]> {
  return [
    {
      day: '1',
      for_all: true,
      image: { alt: 'Test Event Image 1', src: await getImage({ src: EventImage1 }) },
      month: 'Januar',
      short_description: 'Das ist ein Test Event. Komm nicht vorbei, weil es ist nicht real.',
      slug: 'event-1',
      title: 'Event 1',
    },
    {
      day: '31',
      for_all: true,
      image: { alt: 'Test Event Image 2', src: await getImage({ src: EventImage2 }) },
      month: 'Oktober',
      short_description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium, felis sed luctus tempor',
      slug: 'event-2',
      title: 'Event 2',
    },
    {
      day: '24',
      for_all: false,
      image: { alt: 'Test Event Image 3', src: await getImage({ src: EventImage3 }) },
      month: 'Mai',
      short_description: 'Noch ein Test Event, aber nur für Mitglieder !!!1!!11!111elf1',
      slug: 'event-3',
      title: 'Event 3',
    },
  ];
}
