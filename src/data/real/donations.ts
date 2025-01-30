import type { GetImageResult } from 'astro';

import CircleDecorations from '@assets/icons/CircleDecorations.svg';
import DonationBoxHand from '@assets/icons/DonationBoxHand.svg';
import HandShake from '@assets/icons/HandShake.svg';
import HeadLightbulb from '@assets/icons/HeadLightbulb.svg';
import ExpertiseImage from '@assets/support-us/Expertise-spenden.jpeg';
import GeldspendenImage from '@assets/support-us/Geld-spenden.jpeg';
import PartnerImage from '@assets/support-us/Partner-werden.jpeg';
import SachspendenImage from '@assets/support-us/sachspenden.jpeg';
import { getImage } from 'astro:assets';

export type DonationMethod = {
  buttonAtEnd?: boolean;
  description: string;
  icon: {
    height: number;
    src: string;
    width: number;
  };
  image: GetImageResult;
  text: string;
  title: string;
};

export async function getDonationMethods() {
  const possibilities = [
    {
      description: 'Deine Stiftung oder Organisation ist interessiert an einer Kooperation?',
      icon: HandShake,
      image: await optimizeImage(PartnerImage),
      text: 'Wenn deine Stiftung, Organisation oder Unternehmen unsere Werte und Ziele teilen, können wir gemeinsam Projekte entwickeln, die unsere Gemeinschaft und junge Menschen fördern. Für mehr Informationen und Austausch schreibe uns richtig gerne eine Email.',
      title: 'Partner werden',
    },
    {
      description: 'Du willst uns einmalig oder regelmäßig Geld spenden?',
      icon: DonationBoxHand,
      image: await optimizeImage(GeldspendenImage),
      text: 'Deine Spende unterstützt YoungVision und seine Mitglieder enorm. Von dem Geld wird die Vereinsstruktur gehalten und Veranstaltungen für junge Menschen realisiert.',
      title: 'Geld spenden',
    },
    {
      buttonAtEnd: true,
      description: 'Du hast Lust deine Expertise mit uns zu teilen?',
      extraText:
        'Wir suchen Unterstützung für folgende Bereiche\n- Supervision\n- Kassenprüfer\n- Steuerberatung\n- Therapeutische Begleitung bei Events\n\nWir freuen uns auf deine Kontaktaufnahme zu [kontakt@youngvision.org](mailto:kontakt@youngvision.org)',
      icon: HeadLightbulb,
      image: await optimizeImage(ExpertiseImage),
      text: 'Du hast Lust YoungVision mit deiner Expertise voranzubringen?',
      title: 'Expertise Spenden',
    },
    {
      description: 'Du möchtest uns mit einer Sachspende unterszützen?',
      extraText:
        'Oder bring deine Sachspende einfach zum nächsten Event in Rosow mit:).\n\nDas wird gerade benötigt\n- Laminiergerät\n- Zeltboden\n- Tipis / Pavillons\n- Verschiedener Bürobedarf\n- Papierschneider\n- Haltbare Lebensmittel',
      icon: CircleDecorations,
      image: await optimizeImage(SachspendenImage),
      text: 'Sachspenden, sei es in Form von Ausrüstung, Ressourcen oder anderen Gütern, können einen direkten Einfluss auf unsere Projekte und Veranstaltungen haben.',
      title: 'Sachspenden',
    },
  ];
  return possibilities;
}

async function optimizeImage(src: ImageMetadata) {
  return getImage({
    src,
  });
}
