import type { GetImageResult } from 'astro';
import type { Event as EventCMS } from './payload-types.ts';
import { realEventData } from './real/events.ts';
import { realInstagramData } from './real/instagram.ts';
import { testEventData } from './test/events.ts';
import { testInstagramData } from './test/instagram.ts';

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

export type YearlyEvent = {
  slug: string; // I think this slug is used nowhere
  title: string;
  day: string;
  month: string;
  short_description: string;
  //TODO: this should probably also be an ImageWithAlt
  image: {
    src: GetImageResult;
  };
  for_all: boolean;
  future?: string;
};

export type InstagramPost = {
  src: GetImageResult;
  alt: string;
  link: string;
};

export interface EventData {
  getAllPages: () => Promise<EventPage[]>;
  get3CalendarEntries: () => Promise<[EventCalendarEntry, EventCalendarEntry, EventCalendarEntry]>;
  getAllYearlyEvents: () => Promise<YearlyEvent[]>;
}

export interface InstagramData {
  getRecentPhotos: (count: number) => Promise<InstagramPost[]>;
}

export const eventData = process.env.PLAYWRIGHT_TEST === 'true' ? testEventData : realEventData;

// Use fake posts in dev because otherwise we hit instagrams rate limit very quickly
export const instagramData =
  process.env.NODE_ENV === 'development' ||
  process.env.PLAYWRIGHT_TEST === 'true' ||
  process.env.PREVIEW_DEPLOYMENT === 'true'
    ? testInstagramData
    : realInstagramData;
