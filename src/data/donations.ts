import ExpertiseImage from '@assets/support-us/Expertise-spenden.jpeg';
import GeldspendenImage from '@assets/support-us/Geld-spenden.jpeg';
import PartnerImage from '@assets/support-us/Partner-werden.jpeg';
import SachspendenImage from '@assets/support-us/sachspenden.jpeg';

import CircleDecorations from '@assets/icons/CircleDecorations.svelte';
import DonationBoxHand from '@assets/icons/DonationBoxHand.svelte';
import HandShake from '@assets/icons/HandShake.svelte';
import HeadLightbulb from '@assets/icons/HeadLightbulb.svelte';

export function getDonationMethods() {
  const possibilities = [
    {
      title: 'Partner werden',
      description: 'Deine Stiftung oder Organisation ist interessiert an einer Kooperation?',
      text: 'Wenn deine Stiftung, Organisation oder Unternehmen unsere Werte und Ziele teilen, können wir gemeinsam Projekte entwickeln, die unsere Gemeinschaft und junge Menschen fördern. Für mehr Informationen und Austausch schreibe uns richtig gerne eine Email.',
      icon: HandShake,
      image: PartnerImage.src,
    },
    {
      title: 'Geld spenden',
      description: 'Du willst uns einmalig oder regelmäßig Geld spenden?',
      text: 'Deine Spende unterstützt YoungVision und seine Mitglieder enorm. Von dem Geld wird die Vereinsstruktur gehalten und Veranstaltungen für junge Menschen realisiert.',
      icon: DonationBoxHand,
      image: GeldspendenImage.src,
    },
    {
      title: 'Expertise Spenden',
      description: 'Du hast Lust deine Expertise mit uns zu teilen?',
      text: 'Du hast Lust YoungVision mit deiner Expertise voranzubringen?',
      extraText:
        'Wir suchen Unterstützung für folgende Bereiche\n- Supervision\n- Kassenprüfer\n- Steuerberatung\n- Therapeutische Begleitung bei Events\n\nWir freuen uns auf deine Kontaktaufnahme zu [kontakt@youngvision.org](mailto:kontakt@youngvision.org)',
      buttonAtEnd: true,
      icon: HeadLightbulb,
      image: ExpertiseImage.src,
    },
    {
      title: 'Sachspenden',
      description: 'Du möchtest uns mit einer Sachspende unterszützen?',
      text: 'Sachspenden, sei es in Form von Ausrüstung, Ressourcen oder anderen Gütern, können einen direkten Einfluss auf unsere Projekte und Veranstaltungen haben.',
      extraText:
        'Oder bring deine Sachspende einfach zum nächsten Event in Rosow mit:).\n\nDas wird gerade benötigt\n- Laminiergerät\n- Zeltboden\n- Tipis / Pavillons\n- Verschiedener Bürobedarf\n- Papierschneider\n- Haltbare Lebensmittel',
      icon: CircleDecorations,
      image: SachspendenImage.src,
    },
  ];
  return possibilities;
}
