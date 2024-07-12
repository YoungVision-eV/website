import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import type { InstagramPost } from '../index.ts';

async function getPhoto(src: string | ImageMetadata) {
  return getImage({ src, width: 208, height: 208, densities: [1, 1.5, 2] });
}

export const realInstagramData = {
  getRecentPhotos,
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
  const response = await fetch(
    `https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={%22id%22:%223938579639%22,%22first%22:${count},%22after%22:null}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    },
  );
  console.groupCollapsed('\nInstagram API response');
  console.debug(response);
  const data = await response.json();
  console.debug(data);
  console.groupEnd();
  const posts = data.data.user.edge_owner_to_timeline_media.edges as InstagramAPINode[];

  return Promise.all(
    posts.map(async ({ node: p }: InstagramAPINode) => ({
      src: await getPhoto(p.display_url),
      alt: p.edge_media_to_caption.edges[0].node.text!,
      link: `https://instagram.com/p/${p.shortcode}`,
    })),
  );
}
