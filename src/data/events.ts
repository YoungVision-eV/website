import { getImage } from 'astro:assets';

import pastEvent from '@assets/events/calendar-past-event.jpeg';
import thirdEventImage from '@assets/events/calendar-third-event.jpeg';
import calendarCoverImage from '@assets/events/calendar-cover.jpeg';

import EventImage1 from '@assets/events/projects-event-image-1.jpeg';
import EventImage2 from '@assets/events/projects-event-image-2.jpeg';
import EventImage3 from '@assets/events/projects-event-image-3.jpeg';

export interface Event {
	title: string;
	date: Date;
	description: string;
	slug?: string;
	image: {
		src: Awaited<ReturnType<typeof getImage>>;
	};
}

export async function getNext3Events(): Promise<[Event, Event, Event]> {
	const image1 = await getImage({ src: thirdEventImage });
	const image2 = await getImage({ src: calendarCoverImage });
	const image3 = await getImage({ src: pastEvent });

	const next3Events: [Event, Event, Event] = [
		{
			title: 'Mitmach Call',
			date: new Date(2024, 1, 28),
			description: 'Sei dabei und gestalte YoungVision mit!',
			image: {
				src: image1,
			},
		},
		{
			title: 'Bauwoche in Rosow',
			date: new Date(2024, 3, 1),
			description: 'Können wir das schaffen? Yo wir schaffen das!',
			slug: 'bauwoche-2024',
			image: {
				src: image2,
			},
		},
		{
			title: 'Mitgliederversammlung',
			date: new Date(2024, 3, 4),
			description: 'Alle Jahre wieder: Sei dabei, entscheide und gestalte mit!',
			image: {
				src: image3,
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
