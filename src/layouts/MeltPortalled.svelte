<script>
  import { melt } from '@melt-ui/svelte';
  import newsletterSignup from '@components/stores/newsletterSignup';
  const {
    elements: { portalled },
  } = newsletterSignup;
</script>

<div use:melt={$portalled}>
  <slot />
</div>
