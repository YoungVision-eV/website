<script>
	import clsx from 'clsx';
	import YoungVisionLogoFull from '@assets/icons/YoungVisionLogoFull.svelte';

	const pages = [
		{ name: 'Home', url: '/' },
		{ name: 'Über Uns', url: '/about-us' },
		{ name: 'Veranstaltungen', url: '/events' },
		{ name: 'Unterstütze uns', url: '/support-us' },
		{ name: 'Mitgliedschaft', url: '/members' },
	];

	export let currentPage = '';

	let menuOpen = false;

	const openMenu = () => {
		menuOpen = true;
	};

	const closeMenu = () => {
		menuOpen = false;
	};
</script>

<header>
	<nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
		<a href="/" class="-m-1.5 flex p-1.5">
			<YoungVisionLogoFull class="h-8 w-auto" />
			<span class="sr-only">YoungVision</span>
		</a>
		<!-- Mobile menu -->
		<div class="flex lg:hidden">
			<button
				type="button"
				class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-dark-green"
				on:click={openMenu}
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
		</div>
		<!-- Desktop menu -->
		<div class="hidden lg:flex lg:gap-x-12">
			{#each pages as page}
				<a
					href={page.url}
					class={clsx('text-sm leading-6 text-black hover:underline ', {
						'font-semibold': currentPage === page.url,
					})}
					aria-current={currentPage === page.url ? 'page' : undefined}>{page.name}</a
				>
			{/each}
		</div>
	</nav>
	<!-- Mobile menu, show/hide based on menu open state. -->
	<!-- TODO: add animation on open and close.-->
	{#if menuOpen}
		<div id="mobile-menu" class="lg:hidden" role="dialog" aria-modal="true">
			<!-- Background backdrop, show/hide based on slide-over state. -->
			<div class="fixed inset-0 z-10" />
			<div
				class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
			>
				<div class="flex items-center justify-between">
					<a href="/" class="-m-1.5 flex p-1.5">
						<YoungVisionLogoFull class="h-8 w-auto" />
						<span class="sr-only">YoungVision</span>
					</a>
					<button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" on:click={closeMenu}>
						<span class="sr-only">Close main menu</span>
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<div class="mt-6 flow-root">
					<div class="-my-6 divide-y divide-gray-500/10">
						<div class="space-y-2 py-6">
							{#each pages as page}
								<a
									href={page.url}
									aria-current={currentPage === page.url ? 'page' : undefined}
									on:click={closeMenu}
									class={clsx('-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-black', {
										'font-semibold': currentPage === page.url,
									})}>{page.name}</a
								>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</header>
