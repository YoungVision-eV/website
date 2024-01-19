<script>
	import { fade, fly } from 'svelte/transition';
	import { melt } from '@melt-ui/svelte';
	import newsletterSignup from '@components/stores/newsletterSignup';
	import NewsletterSignupDialog from './NewsletterSignupDialog.svelte';

	const {
		elements: { overlay, content },
		states: { open },
	} = newsletterSignup;
</script>

{#if $open}
	<div
		use:melt={$overlay}
		class="fixed inset-0 z-50 bg-black/50"
		transition:fade={{ duration: 150 }}
	/>
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
