import type { GetImageResult } from 'astro';
import type { Event as EventCMS } from './payload-types.ts';
import { realEventData } from './real/events.ts';
import { testEventData } from './test/events.ts';

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

export interface EventData {
  getAllPages: () => Promise<EventPage[]>;
  get3CalendarEntries: () => Promise<[EventCalendarEntry, EventCalendarEntry, EventCalendarEntry]>;
  getAllYearlyEvents: () => Promise<YearlyEvent[]>;
}

export const eventData = process.env.PLAYWRIGHT_TEST === 'true' ? testEventData : realEventData;
