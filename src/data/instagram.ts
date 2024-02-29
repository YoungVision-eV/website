import { getImage } from 'astro:assets';

async function getPhoto(src: string) {
  return getImage({ src, widths: [96, 192, 256, 512], inferSize: true });
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

export async function getRecentPhotos(): Promise<InstagramPost[]> {
  const { data } = await fetch(
    'https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={%22id%22:%223938579639%22,%22first%22:5,%22after%22:null}',
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
