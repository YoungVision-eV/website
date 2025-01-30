import type { ImageMetadata } from 'astro';

import fifthPost from '@assets/instagram/fifth-post.png';
import firstPost from '@assets/instagram/first-post.png';
import fourthPost from '@assets/instagram/fourth-post.jpeg';
import secondPost from '@assets/instagram/second-post.png';
import thirdPost from '@assets/instagram/third-post.png';
import { getImage } from 'astro:assets';

import type { InstagramPost } from '../index.ts';

export const testInstagramData = {
  getRecentPhotos,
};

export async function getRecentPhotos(count: number): Promise<InstagramPost[]> {
  const fakePosts = [
    {
      alt: 'First Post',
      link: 'https://www.instagram.com/youngvision_ev/',
      src: await getPhoto(firstPost),
    },
    {
      alt: 'Second Post',
      link: 'https://www.instagram.com/youngvision_ev/',
      src: await getPhoto(secondPost),
    },
    {
      alt: 'Third Post',
      link: 'https://www.instagram.com/youngvision_ev/',
      src: await getPhoto(thirdPost),
    },

    {
      alt: 'Fourth Post',
      link: 'https://www.instagram.com/youngvision_ev/',
      src: await getPhoto(fourthPost),
    },
    {
      alt: 'Fifth Post',
      link: 'https://www.instagram.com/youngvision_ev/',
      src: await getPhoto(fifthPost),
    },
  ];
  // Just repeat fake posts to get the desired count
  return Array(count)
    .fill(null)
    .map((_, i) => fakePosts[i % fakePosts.length]);
}

async function getPhoto(src: ImageMetadata | string) {
  return getImage({ densities: [1, 1.5, 2], height: 208, src, width: 208 });
}
