import type { GetImageResult, ImageMetadata } from 'astro';

import AndreaPortrait from '@assets/testimonials/Portrait-Andrea.jpg';
import LenaPortrait from '@assets/testimonials/Portrait-Lena.jpeg';
import { getImage } from 'astro:assets';

export type Testimonial = {
  age: number;
  image: {
    src: GetImageResult;
  };
  name: string;
  text: string;
};

export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonials: Testimonial[] = [
    {
      age: 22,
      image: { src: await getPortrait(AndreaPortrait) },
      name: 'Andrea',
      text: 'Young Vision bedeutet für mich Verbundenheit mit mir selbst und anderen Leuten sowie Leichtigkeit und einfach einen Ort zu haben wo man für einen Moment mal den Alltagsstress beiseite lassen kann',
    },
    {
      age: 17,
      image: { src: await getPortrait(LenaPortrait) },
      name: 'Lena',
      text: 'YoungVision bedeutet für mich, mich mit mir selbst zu beschäftigen, mich (besser) kennenzulernen, eine wundervolle Gemeinschaft mit absolut faszinierenden Begegnungen, einfach Liebe, Wohlfühlen, Erfüllung und Auftanken',
    },
  ];
  return testimonials;
}

async function getPortrait(src: ImageMetadata) {
  return getImage({
    src,
    widths: [100, 200, 300, 600],
  });
}
