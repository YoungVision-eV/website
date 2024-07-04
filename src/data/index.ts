import type { Event as EventCMS } from './payload-types.ts';

export interface EventCalendarEntry {
  title: string;
  date: Date;
  description: string;
  link?: string;
  image: ImageWithAlt;
}

export interface EventPage {
  title: string;
  start: Date;
  end: Date;
  slug: string;
  contentTitle: string;
  content_html: string;
  heroImage: ImageWithAlt;
  address: EventCMS['address'];
  audience: string;
  cost: string;
  team: { name: string; job: string; bio: string; image: ImageWithAlt }[];
  registrationLink: string;
  timetable?: ImageWithAlt;
}

export type ImageWithAlt = {
  src: ImageMetadata;
  alt: string;
};

export interface DataGetter {
  getAllEvents: () => Promise<EventPage[]>;
  getNext3Events: () => Promise<[EventCalendarEntry, EventCalendarEntry, EventCalendarEntry]>;
}
