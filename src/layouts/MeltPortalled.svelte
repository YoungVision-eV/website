<script>
  import newsletterSignup from '@components/stores/newsletterSignup';
  import { melt } from '@melt-ui/svelte';
  const {
    elements: { portalled },
  } = newsletterSignup;
</script>

<div use:melt={$portalled}>
  <slot />
</div>
