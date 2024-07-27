import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

import fifthPost from '@assets/instagram/fifth-post.png';
import firstPost from '@assets/instagram/first-post.png';
import fourthPost from '@assets/instagram/fourth-post.jpeg';
import secondPost from '@assets/instagram/second-post.png';
import thirdPost from '@assets/instagram/third-post.png';

import type { InstagramPost } from '../index.ts';

export const testInstagramData = {
  getRecentPhotos,
};

async function getPhoto(src: string | ImageMetadata) {
  return getImage({ src, width: 208, height: 208, densities: [1, 1.5, 2] });
}

export async function getRecentPhotos(count: number): Promise<InstagramPost[]> {
  const fakePosts = [
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
  // Just repeat fake posts to get the desired count
  return Array(count)
    .fill(null)
    .map((_, i) => fakePosts[i % fakePosts.length]);
}
