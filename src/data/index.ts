import type { GetImageResult } from 'astro';

import type { Event as EventCMS } from './payload-types.ts';

import { realEventData } from './real/events.ts';
import { realInstagramData } from './real/instagram.ts';
import { testEventData } from './test/events.ts';
import { testInstagramData } from './test/instagram.ts';

export interface EventCalendarEntry {
  date: Date;
  description: string;
  image: { alt: string; src: GetImageResult };
  link?: string;
  title: string;
}

export interface EventData {
  get3CalendarEntries: () => Promise<[EventCalendarEntry, EventCalendarEntry, EventCalendarEntry]>;
  getAllPages: () => Promise<EventPage[]>;
  getAllYearlyEvents: () => Promise<YearlyEvent[]>;
}

export interface EventPage {
  address: EventCMS['address'];
  audience: string;
  content_html: string;
  contentTitle: string;
  cost: string;
  end: Date;
  heroImage: RemoteImage;
  registrationLink: string;
  slug: string;
  sponsorLogo?: RemoteImage;
  start: Date;
  team: { bio: string; image: RemoteImage; job: string; name: string }[];
  timetable?: RemoteImage;
  title: string;
}

export interface InstagramData {
  getRecentPhotos: (count: number) => Promise<InstagramPost[]>;
}

export type InstagramPost = {
  alt: string;
  link: string;
  src: GetImageResult;
};

export type RemoteImage = {
  alt: string;
  height: number;
  src: string;
  width: number;
};

export type YearlyEvent = {
  day: string;
  for_all: boolean;
  future?: string;
  //TODO: this should probably also be an ImageWithAlt
  image: GetImageResult & {
    alt: string;
  };
  month: string;
  short_description: string;
  slug: string; // I think this slug is used nowhere
  title: string;
};

export const eventData = process.env.PLAYWRIGHT_TEST === 'true' ? testEventData : realEventData;

// Use fake posts in dev because otherwise we hit instagrams rate limit very quickly
export const instagramData =
  process.env.NODE_ENV === 'development' ||
  process.env.PLAYWRIGHT_TEST === 'true' ||
  process.env.PREVIEW_DEPLOYMENT === 'true'
    ? testInstagramData
    : realInstagramData;
