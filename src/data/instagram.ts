import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

import fifthPost from '@assets/instagram/fifth-post.png';
import firstPost from '@assets/instagram/first-post.png';
import fourthPost from '@assets/instagram/fourth-post.jpeg';
import secondPost from '@assets/instagram/second-post.png';
import thirdPost from '@assets/instagram/third-post.png';

async function getPhoto(src: string | ImageMetadata) {
  return getImage({ src, width: 208, height: 208, densities: [1, 1.5, 2] });
}

type InstagramPost = {
  src: Awaited<ReturnType<typeof getImage>>;
  alt: string;
  link: string;
};

type InstagramAPINode = {
  node: {
    display_url: string;
    dimensions: {
      height: number;
      width: number;
    };
    edge_media_to_caption: {
      edges: {
        node: {
          text: string;
        };
      }[];
    };
    shortcode: string;
  };
};

export async function getRecentPhotos(count: number): Promise<InstagramPost[]> {
  if (process.env.PLAYWRIGHT_TEST === 'true') {
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
  const { data } = await fetch(
    `https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={%22id%22:%223938579639%22,%22first%22:${count},%22after%22:null}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    },
  ).then((res) => res.json());
  const posts = data.user.edge_owner_to_timeline_media.edges as InstagramAPINode[];

  return Promise.all(
    posts.map(async ({ node: p }: InstagramAPINode) => ({
      src: await getPhoto(p.display_url),
      alt: p.edge_media_to_caption.edges[0].node.text!,
      link: `https://instagram.com/p/${p.shortcode}`,
    })),
  );
}
