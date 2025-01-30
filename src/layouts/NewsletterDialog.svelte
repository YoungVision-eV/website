<script>
  import newsletterSignup from '@components/stores/newsletterSignup';
  import { melt } from '@melt-ui/svelte';
  import { fade, fly } from 'svelte/transition';

  import NewsletterSignupDialog from './NewsletterSignupDialog.svelte';

  const {
    elements: { content, overlay },
    states: { open },
  } = newsletterSignup;
</script>

{#if $open}
  <div
    use:melt={$overlay}
    class="fixed inset-0 z-50 bg-black/50"
    transition:fade={{ duration: 150 }}
  ></div>
  <div
    transition:fly={{ duration: 150 }}
    use:melt={$content}
    class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
            max-w-[540px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
            p-6 shadow-lg"
  >
    <NewsletterSignupDialog />
  </div>
{/if}
