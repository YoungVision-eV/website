<script>
	import Background from '@assets/about-us/background-what-we-do.png';
	import { createCollapsible, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';

	import TriadenImage from '@assets/about-us/Triaden.jpeg';
	import KuschelnImage from '@assets/about-us/Kuscheln.jpeg';
	import MeditationImage from '@assets/about-us/Meditation.jpeg';
	import TanzenImage from '@assets/about-us/Tanzen.jpeg';
	import SharingImage from '@assets/about-us/Sharing.jpeg';

	import clsx from 'clsx';
	import ChevronUp from '@assets/icons/ChevronUp.svelte';
	import ChevronDown from '@assets/icons/ChevronDown.svelte';

	const exercises = [
		{
			image: TriadenImage,
			title: 'Triaden',
			description:
				'Eine Triade ist eine Übung der authentischen Kommunikation, in der jede*r erleben kann, andere wirklich zu hören und selbst gehört zu werden. Sie schafft Raum für Selbsterkenntnis und unterstützt den Aufbau authentischer Verbindungen.',
		},
		{
			image: MeditationImage,
			title: 'Meditation',
			description:
				'Schon eine kurze Meditation zu Anfang jeder Runde macht einen riesen Unterschied! Sie schafft inneren Raum für eigene Empfindungen, Tiefe in der Wahrnehmung und damit die Basis unserer gemeinsamen Arbeit',
		},
		{
			image: SharingImage,
			title: 'Sharing',
			description:
				'In unseren Sharingrunden hat jede*r die Möglichkeit eigene Erfahrungen und Gefühle mit der Gruppe zu teilen. So können unheimlich tiefe, befreiende und verbindende Momente entstehen. ',
		},
		{
			image: TanzenImage,
			title: 'Tanzen',
			description:
				'Hier geht es nicht um Schritte oder Choreografie, sondern um das Loslassen und deinen Selbstausdruck. Dies ist dein Raum, dich selbst und deinen Körper zu spüren und dich einfach mal fallen zu lassen. ',
		},
		{
			image: KuschelnImage,
			title: 'Kuscheln',
			description:
				'Körperlicher Kontakt ist einer von vielen Ausdrücken von zwischenmenschlicher Verbindung. Bei unseren Veranstaltungen entsteht durch den sicheren Raum ganz natürlich eine Kuschelatmosphäre. Aber auch hier gilt: alles darf, nichts muss! Wir schreiben Konsent ganz groß und daher wird dein “nein” nicht nur respektiert sondern ist auch willkommen.',
		},
	];

	const {
		elements: { root, content, trigger },
		states: { open },
	} = createCollapsible();
</script>

<section class="relative w-full px-5 pb-16 pt-24 lg:px-20">
	<img
		class="absolute left-[-6rem] top-[-9rem] -z-10 h-[18rem] w-auto lg:left-[-12rem] lg:top-[-31rem]
		lg:h-auto lg:w-[50em]"
		alt="Flowers"
		src={Background.src}
	/>
	<h2 class="text-center font-serif text-3xl font-bold lg:text-5xl">Was wir tun</h2>
	<h3 class="mt-14 font-serif text-2xl font-bold lg:mt-20 lg:text-4xl">
		Was dich bei unseren Veranstaltungen erwartet
	</h3>
	<div class="mt-6 grid grid-cols-1 gap-y-3 lg:mt-10 lg:grid-cols-2 lg:gap-6">
		<p class="font-sans">
			Unsere Veranstaltungen sind das Herzstück dessen, was YoungVision so besonders macht. Wir
			möchten dir einen Vorgeschmack geben auf das, was dich erwartet, und hoffen, dass du genauso
			begeistert von unseren Angeboten sein wirst wie wir es sind.
		</p>
		<p class="font-sans">
			Im Fokus stehen die Selbsterkundung und -reflektion sowie das Erfahren von Verbindung. Die
			folgenden Aktivitäten erwarten dich bei all unseren Veranstaltungen und mehr.
		</p>
	</div>
	<div class="hidden lg:mt-40 lg:block" use:melt={$root}>
		<div class="grid grid-cols-6 gap-x-12">
			{#each exercises.slice(0, 3) as exercise}
				<div class="col-span-2">
					<div class="px-20 lg:px-0">
						<img
							src={exercise.image.src}
							alt={exercise.title}
							class="aspect-square h-auto w-full rounded-full bg-light-green object-cover object-center"
						/>
					</div>
					<h3 class="mt-5 text-center font-sans text-xl lg:mt-8">{exercise.title}</h3>
					<p class="mt-3 font-sans text-sm lg:mt-8">{exercise.description}</p>
				</div>
			{/each}
		</div>
		{#if $open}
			<div use:melt={$content} class="mt-12 grid grid-cols-6 gap-x-12" transition:slide>
				{#each exercises.slice(3) as exercise}
					<div class="col-span-2">
						<div class="px-20 lg:px-0">
							<img
								src={exercise.image.src}
								alt={exercise.title}
								class="aspect-square h-auto w-full rounded-full bg-light-green object-cover object-center"
							/>
						</div>
						<h3 class="mt-5 text-center font-sans text-xl lg:mt-8">{exercise.title}</h3>
						<p class="mt-3 font-sans text-sm lg:mt-8">{exercise.description}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<div class="lg:hidden" use:melt={$root}>
		<div class="mt-16 flex flex-col gap-12">
			{#each exercises.slice(0, 2) as exercise}
				<div class="flex-1">
					<div class="px-20">
						<img
							src={exercise.image.src}
							alt={exercise.title}
							class="aspect-square h-auto w-full rounded-full bg-light-green object-cover object-center"
						/>
					</div>
					<h3 class="mt-5 text-center font-sans text-xl">{exercise.title}</h3>
					<p class="mt-3 font-sans text-sm">{exercise.description}</p>
				</div>
			{/each}
		</div>
		{#if $open}
			<div use:melt={$content} class="mt-12 flex flex-col gap-12" transition:slide>
				{#each exercises.slice(2) as exercise}
					<div class="flex-1">
						<div class="px-20">
							<img
								src={exercise.image.src}
								alt={exercise.title}
								class="aspect-square h-auto w-full rounded-full bg-light-green object-cover object-center"
							/>
						</div>
						<h3 class="mt-5 text-center font-sans text-xl">{exercise.title}</h3>
						<p class="mt-3 font-sans text-sm">{exercise.description}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<button use:melt={$trigger} class="mt-4 flex w-full flex-col items-center justify-center lg:mt-8">
		<span class="text-sm">{$open ? 'Weniger' : 'Mehr lesen'}</span>
		<div class="mt-2">
			{#if $open}
				<ChevronUp />
			{:else}
				<ChevronDown />
			{/if}
			<div></div>
		</div>
	</button>
	<div class="mx-2 mt-2 w-full border-t border-gray-300" />

	<div
		class={clsx(
			'mt-16 hidden auto-rows-[0] grid-cols-[1fr] gap-y-12 overflow-hidden transition-all lg:mt-40 lg:grid-cols-6 lg:gap-12',
		)}
	>
		{#each exercises as exercise, index}
			<div
				class={clsx(
					'exercise lg:col-span-2',
					index !== 0 && 'mt-12 lg:mt-0',
					index === 3 && 'lg:col-start-2',
				)}
			>
				<div class="px-20 lg:px-0">
					<img
						src={exercise.image.src}
						alt={exercise.title}
						class="aspect-square h-auto w-full rounded-full bg-light-green object-cover object-center"
					/>
				</div>
				<h3 class="mt-5 text-center font-sans text-xl lg:mt-8">{exercise.title}</h3>
				<p class="mt-3 font-sans text-sm lg:mt-8">{exercise.description}</p>
			</div>
		{/each}
	</div>
</section>
