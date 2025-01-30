<script>
  import { melt } from '@melt-ui/svelte';
  import newsletterSignup from '@components/stores/newsletterSignup';
  import Close from '@assets/icons/Close.svelte';

  const {
    elements: { close },
  } = newsletterSignup;
</script>

<button
  use:melt={$close}
  aria-label="close"
  class="absolute right-2 top-2 inline-flex h-8 w-8 appearance-none items-center justify-center rounded-full p-1 text-gray-500 hover:text-gray-900 lg:right-3 lg:top-3 lg:h-10 lg:w-10"
>
  <Close />
</button>
<h2 class="text-center font-serif text-xl font-bold text-orange lg:text-2xl">
  Newsletter Anmeldung
</h2>
<iframe
  class="mt-4"
  title="newsletter-signup bei brevo"
  width="540"
  height="540"
  src="https://bc49be3c.sibforms.com/serve/MUIFAHP6OEtxVhHwwcM9iQgG7lmeuOJoup-8o3PmywyII2OK3C6MMS2JOXn88zBR57cHa2UCFBGQB08VjSGTGZpWV3KxrofYHvYNN93sGjFkYTjlvGWCGRmuejRx-P08H-Q-SblgDKFtyp1M3hpx-uYxnPwcittPWYX_8jXyCpOICAaebopXc-SMvG9cdnN1SIqdUA9QfGg7SAtI"
  frameborder="0"
  scrolling="auto"
  allowfullscreen
  style="display: block;margin-left: auto;margin-right: auto;max-width: 100%;"
></iframe>
