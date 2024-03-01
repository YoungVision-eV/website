import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

import KuschelnImage from '@assets/about-us/Kuscheln.jpeg';
import MeditationImage from '@assets/about-us/Meditation.jpeg';
import SharingImage from '@assets/about-us/Sharing.jpeg';
import TanzenImage from '@assets/about-us/Tanzen.jpeg';
import TriadenImage from '@assets/about-us/Triaden.jpeg';

export type Exercise = {
  title: string;
  description: string;
  image: Awaited<ReturnType<typeof getImage>>;
};

async function optimizeImage(src: ImageMetadata) {
  return await getImage({ src, widths: [300, 600, 900], formats: ['avif', 'webp'] });
}

export async function getExercises(): Promise<Exercise[]> {
  const exercises = [
    {
      image: await optimizeImage(TriadenImage),
      title: 'Triaden',
      description:
        'Eine Triade ist eine Übung der authentischen Kommunikation, in der jede*r erleben kann, andere wirklich zu hören und selbst gehört zu werden. Sie schafft Raum für Selbsterkenntnis und unterstützt den Aufbau authentischer Verbindungen.',
    },
    {
      image: await optimizeImage(MeditationImage),
      title: 'Meditation',
      description:
        'Schon eine kurze Meditation zu Anfang jeder Runde macht einen riesen Unterschied! Sie schafft inneren Raum für eigene Empfindungen, Tiefe in der Wahrnehmung und damit die Basis unserer gemeinsamen Arbeit',
    },
    {
      image: await optimizeImage(SharingImage),
      title: 'Sharing',
      description:
        'In unseren Sharingrunden hat jede*r die Möglichkeit eigene Erfahrungen und Gefühle mit der Gruppe zu teilen. So können unheimlich tiefe, befreiende und verbindende Momente entstehen. ',
    },
    {
      image: await optimizeImage(TanzenImage),
      title: 'Tanzen',
      description:
        'Hier geht es nicht um Schritte oder Choreografie, sondern um das Loslassen und deinen Selbstausdruck. Dies ist dein Raum, dich selbst und deinen Körper zu spüren und dich einfach mal fallen zu lassen. ',
    },
    {
      image: await optimizeImage(KuschelnImage),
      title: 'Kuscheln',
      description:
        'Körperlicher Kontakt ist einer von vielen Ausdrücken von zwischenmenschlicher Verbindung. Bei unseren Veranstaltungen entsteht durch den sicheren Raum ganz natürlich eine Kuschelatmosphäre. Aber auch hier gilt: alles darf, nichts muss! Wir schreiben Konsent ganz groß und daher wird dein “nein” nicht nur respektiert sondern ist auch willkommen.',
    },
  ];
  return exercises;
}
