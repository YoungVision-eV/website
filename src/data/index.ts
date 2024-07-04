import type { GetImageResult } from 'astro';
import type { Event as EventCMS } from './payload-types.ts';

export interface EventCalendarEntry {
  title: string;
  date: Date;
  description: string;
  link?: string;
  image: { src: GetImageResult; alt: string };
}

export interface EventPage {
  title: string;
  start: Date;
  end: Date;
  slug: string;
  contentTitle: string;
  content_html: string;
  heroImage: RemoteImage;
  address: EventCMS['address'];
  audience: string;
  cost: string;
  team: { name: string; job: string; bio: string; image: RemoteImage }[];
  registrationLink: string;
  timetable?: RemoteImage;
  sponsorLogo?: RemoteImage;
}

export type RemoteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ImageWithAlt = {
  src: ImageMetadata;
  alt: string;
};

export interface DataGetter {
  getAllEvents: () => Promise<EventPage[]>;
  getNext3Events: () => Promise<[EventCalendarEntry, EventCalendarEntry, EventCalendarEntry]>;
}
