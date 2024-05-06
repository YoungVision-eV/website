import { getImage } from 'astro:assets';

import calendarCoverImage from '@assets/events/calendar-cover.jpeg';
import pastEvent from '@assets/events/calendar-past-event.jpeg';
import thirdEventImage from '@assets/events/calendar-third-event.jpeg';

import EventImage1 from '@assets/events/projects-event-image-1.jpeg';
import EventImage2 from '@assets/events/projects-event-image-2.jpeg';
import EventImage3 from '@assets/events/projects-event-image-3.jpeg';

export interface Event {
  title: string;
  date: Date;
  description: string;
  link?: string;
  image: {
    src: Awaited<ReturnType<typeof getImage>>;
  };
}

export async function getNext3Events(): Promise<[Event, Event, Event]> {
  const image1 = await getImage({ src: thirdEventImage });
  const image2 = await getImage({ src: calendarCoverImage });
  const image3 = await getImage({ src: pastEvent });

  if (process.env.PLAYWRIGHT_TEST === 'true') {
    return [
      {
        title: 'Past Event',
        date: new Date(1999, 6, 10),
        description: 'This event covers the test case for past events',
        link: '/events/bauwoche-2024',
        image: {
          src: image1,
        },
      },
      {
        title: 'Future Event 1',
        date: new Date(2999, 10, 2),
        description: 'This event will always (until the year 2999) be in the future.',
        link: '/events/bauwoche-2024',
        image: {
          src: image2,
        },
      },
      {
        title: 'Future Event 2',
        date: new Date(3024, 0, 28),
        description: 'This is test data. Test 1 2 3. Test test.',
        image: {
          src: image3,
        },
      },
    ];
  }
  const next3Events: [Event, Event, Event] = [
    {
      title: 'Forschungsraum: Körper & Sexualität',
      date: new Date(2024, 4, 17),
      description: 'Ein Workshop mit Raum zum Austausch über Sexualität und unsere Körper.',
      link: '/events/forschungsraum-korper',
      image: {
        src: image1,
      },
    },
    {
      title: 'Forschungsraum: Wutkraft',
      date: new Date(2024, 5, 27),
      description: 'Lasst uns die Kraft, die in unserer Wut steckt, gemeinsam erforschen.',
      image: {
        src: image3,
      },
    },
    {
      title: 'Sommer Gathering',
      date: new Date(2024, 8, 2),
      description: 'Zusammen werden wir erkunden, was Community für uns sein kann,
      image: {
        src: image2,
      },
    },
  ];

  return next3Events;
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
