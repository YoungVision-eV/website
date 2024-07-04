import { getImage } from 'astro:assets';

import AndreaPortrait from '@assets/testimonials/Portrait-Andrea.jpg';
import LenaPortrait from '@assets/testimonials/Portrait-Lena.jpeg';
import type { GetImageResult, ImageMetadata } from 'astro';

export type Testimonial = {
  name: string;
  age: number;
  text: string;
  image: {
    src: GetImageResult;
  };
};

async function getPortrait(src: ImageMetadata) {
  return getImage({
    src,
    widths: [100, 200, 300, 600],
  });
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonials: Testimonial[] = [
    {
      name: 'Andrea',
      age: 22,
      text: 'Young Vision bedeutet für mich Verbundenheit mit mir selbst und anderen Leuten sowie Leichtigkeit und einfach einen Ort zu haben wo man für einen Moment mal den Alltagsstress beiseite lassen kann',
      image: { src: await getPortrait(AndreaPortrait) },
    },
    {
      name: 'Lena',
      age: 17,
      text: 'YoungVision bedeutet für mich, mich mit mir selbst zu beschäftigen, mich (besser) kennenzulernen, eine wundervolle Gemeinschaft mit absolut faszinierenden Begegnungen, einfach Liebe, Wohlfühlen, Erfüllung und Auftanken',
      image: { src: await getPortrait(LenaPortrait) },
    },
  ];
  return testimonials;
}
