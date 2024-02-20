import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

import fifthPost from '@assets/instagram/fifth-post.png';
import firstPost from '@assets/instagram/first-post.png';
import fourthPost from '@assets/instagram/fourth-post.jpeg';
import secondPost from '@assets/instagram/second-post.png';
import thirdPost from '@assets/instagram/third-post.png';

async function getPhoto(src: ImageMetadata) {
	return getImage({ src, widths: [96, 192, 256, 512] });
}

type InstagramPost = {
	src: Awaited<ReturnType<typeof getImage>>;
	alt: string;
	link: string;
};

export async function getRecentPhotos(): Promise<InstagramPost[]> {
	return [
		{
			src: await getPhoto(firstPost),
			alt: 'First Post',
			link: 'https://www.instagram.com/youngvision_ev/',
		},
		{
			src: await getPhoto(secondPost),
			alt: 'Second Post',
			link: 'https://www.instagram.com/youngvision_ev/',
		},
		{
			src: await getPhoto(thirdPost),
			alt: 'Third Post',
			link: 'https://www.instagram.com/youngvision_ev/',
		},
		{
			src: await getPhoto(fourthPost),
			alt: 'Fourth Post',
			link: 'https://www.instagram.com/youngvision_ev/',
		},
		{
			src: await getPhoto(fifthPost),
			alt: 'Fifth Post',
			link: 'https://www.instagram.com/youngvision_ev/',
		},
	];
}
