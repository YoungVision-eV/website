<script>
	import { createAccordion, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';

	import SachspendenImage from '@assets/support-us/sachspenden.jpeg';
	import GeldspendenImage from '@assets/support-us/Geld-spenden.jpeg';
	import ExpertiseImage from '@assets/support-us/Expertise-spenden.jpeg';
	import PartnerImage from '@assets/support-us/Partner-werden.jpeg';

	import JakobPortrait from '@assets/support-us/jakob-portait.jpeg';
	import Button from '@components/Button.svelte';
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';
	import HandShake from '@assets/icons/HandShake.svelte';
	import DonationBoxHand from '@assets/icons/DonationBoxHand.svelte';
	import HeadLightbulb from '@assets/icons/HeadLightbulb.svelte';
	import CircleDecorations from '@assets/icons/CircleDecorations.svelte';

	import clsx from 'clsx';

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
			icon: HeadLightbulb,
			image: ExpertiseImage.src,
		},
		{
			title: 'Sachspenden',
			description: 'Du möchtest uns mit einer Sachspende unterszützen?',
			text: 'Sachspenden, sei es in Form von Ausrüstung, Ressourcen oder anderen Gütern, können einen direkten Einfluss auf unsere Projekte und Veranstaltungen haben.',
			icon: CircleDecorations,
			image: SachspendenImage.src,
		},
	];

	const {
		elements: { content, item, trigger, root },
		helpers: { isSelected },
	} = createAccordion();
</script>

<section class="py-16 lg:py-24">
	<div class="mt-4 lg:px-20">
		<h2 class="font-serif text-2xl font-bold">Weitere Möglichkeiten, uns zu unterstützen</h2>
		<p class="mt-3 text-xl lg:mt-4">
			Deine Unterstützung ist der Schlüssel, um unsere Mission voranzutreiben und jungen Menschen
			transformative Erfahrungen zu ermöglichen. Neben finanziellen Spenden gibt es auch andere
			wertvolle Wege, wie du uns unterstützen kannst:
		</p>
		<TabGroup class="mt-20 hidden lg:block">
			<TabList class="tab-list grid grid-cols-4 grid-rows-4 items-stretch gap-x-16">
				<Tab class="hidden" />
				{#each possibilities as possibility}
					<Tab
						class="row-span-4 grid grid-rows-subgrid items-center justify-between text-center"
						let:selected
					>
						<div
							class={clsx(
								'mx-auto flex h-56 w-56 items-center justify-center rounded-full shadow-lg transition-colors',
								{
									'border-2 border-black bg-green-200': selected,
									'bg-green-500': !selected,
								},
							)}
						>
							<svelte:component this={possibility.icon} />
						</div>
						<h3 class="mt-4 font-serif text-4xl font-bold">{possibility.title}</h3>
						<p class="mt-4">{possibility.description}</p>
						<Button
							class="mt-8"
							text="Schreibe uns"
							href="mailto:kontakt@youngvision.org"
							color="dark"
						/>
					</Tab>
				{/each}
			</TabList>
			<TabPanels>
				<!-- TODO: is there a better way than this hidden tab? -->
				<TabPanel class="hidden" />
				<TabPanel class="pb-16 pt-40 text-2xl">
					<h3 class="text-center font-serif text-5xl font-bold">Partner werden</h3>
					<div class="mt-16 flex justify-between gap-x-28">
						<div class="mt-16">
							<p class="max-w-prose">
								Wenn deine Stiftung, Organisation oder Unternehmen unsere Werte und Ziele teilen,
								können wir gemeinsam Projekte entwickeln, die unsere Gemeinschaft und junge Menschen
								fördern. Für mehr Informationen und Austausch schreibe uns richtig gerne eine Email.
							</p>
							<Button
								class="mt-8"
								text="Schreibe uns"
								href="mailto:kontakt@youngvision.org"
								color="dark"
							/>
						</div>
						<div class="h-[38rem] w-[28rem] flex-none">
							<img
								src={PartnerImage.src}
								class="h-full w-full bg-gray-300 object-cover object-center"
								alt="Partner werden"
							/>
						</div>
					</div>
				</TabPanel>
				<TabPanel class="pb-16 pt-40 text-2xl">
					<h3 class="text-center font-serif text-5xl font-bold">Geld spenden</h3>
					<div class="mt-16 flex justify-between gap-x-28">
						<div class="h-[38rem] w-[28rem] flex-none">
							<img
								src={GeldspendenImage.src}
								class="h-full w-full bg-gray-300 object-cover object-center"
								alt="Geld spenden"
							/>
						</div>
						<div class="mt-16">
							<p class="max-w-prose">
								Deine Spende unterstützt YoungVision und seine Mitglieder enorm. Von dem Geld wird
								die Vereinsstruktur gehalten und Veranstaltungen für junge Menschen realisiert.
							</p>
							<Button
								class="mt-8"
								text="Schreibe uns"
								href="mailto:kontakt@youngvision.org"
								color="dark"
							/>
						</div>
					</div></TabPanel
				>
				<TabPanel class="pb-16 pt-40 text-2xl">
					<h3 class="text-center font-serif text-5xl font-bold">Expertise Spenden</h3>
					<div class="mt-16 flex justify-between gap-x-28">
						<div class="mt-16">
							<p class="max-w-prose">
								Du hast Lust YoungVision mit deiner Expertise voranzubringen?
							</p>
							<p class="mt-12 max-w-prose">Wir suchen Unterstützung für folgende Bereiche:</p>
							<ul class="list-inside list-disc">
								<li>Supervision</li>
								<li>Kassenprüfer</li>
								<li>Steuerberatung</li>
								<li>Therapeutische Begleitung bei Events</li>
							</ul>
							<p class="mt-12 max-w-prose">
								Wir freuen uns auf deine Kontaktaufnahme zu <a href="mailto:kontakt@youngvision.org"
									>kontakt@youngvision.org</a
								>
							</p>
							<Button
								class="mt-8"
								text="Schreibe uns"
								href="mailto:kontakt@youngvision.org"
								color="dark"
							/>
						</div>
						<div class="h-[38rem] w-[28rem] flex-none">
							<img
								src={ExpertiseImage.src}
								class="h-full w-full bg-gray-300 object-cover object-center"
								alt="Expertise Spenden"
							/>
						</div>
					</div>
				</TabPanel>
				<TabPanel class="pb-16 pt-40 text-2xl">
					<h3 class="text-center font-serif text-5xl font-bold">Sachspenden</h3>
					<div class="mt-16 flex items-center justify-between gap-x-28">
						<div class="h-[38rem] w-[28rem] flex-none">
							<img
								src={SachspendenImage.src}
								class="h-full w-full bg-gray-300 object-cover object-center"
								alt="Sachspenden"
							/>
						</div>
						<div>
							<p>
								Sachspenden, sei es in Form von Ausrüstung, Ressourcen oder anderen Gütern, können
								einen direkten Einfluss auf unsere Projekte und Veranstaltungen haben.
							</p>
							<Button
								class="mt-8"
								text="Schreibe uns"
								href="mailto:kontakt@youngvision.org"
								color="dark"
							/>
							<p class="mt-12">
								Oder bring deine Sachspende einfach zum nächsten Event in Rosow mit:).
							</p>
							<p class="mt-12">Das wird gerade benötigt</p>
							<ul class="list-inside list-disc">
								<li>Laminiergerät</li>
								<li>Zeltboden</li>
								<li>Tipis / Pavillons</li>
								<li>Verschiedener Bürobedarf</li>
								<li>Papierschneider</li>
								<li>Haltbare Lebensmittel</li>
							</ul>
						</div>
					</div>
				</TabPanel>
			</TabPanels>
		</TabGroup>
		<ul class="mt-16 px-4 lg:hidden" use:melt={$root}>
			{#each possibilities as possibility}
				<li class="group mt-24 first:mt-0" use:melt={$item(possibility.title)}>
					<div>
						<button
							class="flex items-center gap-x-4 text-left group-even:flex-row-reverse"
							use:melt={$trigger(possibility.title)}
						>
							<div
								class={clsx(
									'flex h-40 w-40 flex-none items-center justify-center rounded-full transition-colors',
									{
										'border-2 border-black bg-green-200': $isSelected(possibility.title),
										'bg-green-500': !$isSelected(possibility.title),
									},
								)}
							>
								<svelte:component this={possibility.icon} />
							</div>
							<div class="group-even:text-right">
								<h3 class="text-xl">{possibility.title}</h3>
								<p class="mt-3">{possibility.description}</p>
							</div>
						</button>
						{#if $isSelected(possibility.title)}
							<div
								title={possibility.title}
								class="pb-8 pt-4"
								use:melt={$content(possibility.title)}
								transition:slide
							>
								<p>{possibility.text}</p>
								<div class="mt-10 h-[27rem] w-full flex-none">
									<img
										src={possibility.image}
										alt={possibility.title}
										class="h-full w-full bg-gray-300 object-cover object-center"
									/>
								</div>
							</div>
						{/if}
					</div>
					<Button
						class="group-odd:float-right"
						text="Schreibe uns"
						href="mailto:kontakt@youngvision.org"
						color="dark"
					/>
				</li>
			{/each}
		</ul>
	</div>
	<div
		class="mt-24 gap-x-28 border-y-2 border-yellow-500 bg-yellow-900 px-4 py-10 lg:mx-20 lg:mt-36 lg:flex lg:flex-row lg:rounded-2xl lg:border-2 lg:px-24"
	>
		<h3 class="font-serif text-2xl font-bold lg:hidden">Falls sie Fragen haben!</h3>
		<img
			src={JakobPortrait.src}
			alt="Jakob"
			class="mx-auto mt-5 h-56 w-56 rounded-2xl bg-gray-300 object-cover object-center lg:mx-0 lg:mt-0"
		/>
		<div>
			<h3 class="hidden text-center font-serif text-4xl font-bold lg:block">
				Falls sie Fragen haben!
			</h3>
			<dl class="mt-8 grid grid-cols-1 lg:grid-cols-2">
				<dt class="font-bold">Ansprechpartner</dt>
				<dd>Jakob Voigt</dd>

				<dt class="mt-5 font-bold lg:mt-0">Email</dt>
				<dd>
					<a class="text-gray-800 underline" href="mailto:jakob.voigt@youngvision.org"
						>jakob.voigt@youngvision.org</a
					>
				</dd>
			</dl>
			<Button class="mt-7" text="Schreibe uns" href="mailto:kontakt@youngvision.org" color="dark" />
		</div>
	</div>
</section>

<style>
	:global(.tab-list) {
		grid-template-rows: 14rem repeat(3, minmax(0, 1fr));
	}
</style>
