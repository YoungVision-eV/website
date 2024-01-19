<script lang="ts">
	import emblaCarouselSvelte, { type EmblaCarouselType } from 'embla-carousel-svelte';

	import ArrowRight from './icons/Arrow-Right.svg';
	import ArrowLeft from './icons/Arrow-Left.svg';
	import clsx from 'clsx';

	let className = '';
	export { className as class };

	let emblaApi: EmblaCarouselType;
	let options = { loop: true };

	const onInit = (event: CustomEvent<EmblaCarouselType>) => {
		emblaApi = event.detail;
	};

	export let testimonials;
</script>

<!-- TODO: add Background -->

<section class={clsx('w-full pb-12 pt-14', className)} data-testid="testimonials">
	<h1 class="mx-5 font-serif text-3xl font-bold lg:mx-16">Von YoungVision Leuten</h1>
	<div class="relative mt-3 overflow-hidden lg:mt-16">
		<div
			class="embla__viewport px-5 lg:px-32"
			use:emblaCarouselSvelte={{ options, plugins: [] }}
			on:emblaInit={onInit}
		>
			<div class="flex">
				{#each testimonials as testimonial}
					<div class="embla__slide mr-5 min-w-0 items-center gap-x-28 lg:mr-32 lg:flex">
						<div class="flex-none">
							<img
								src={testimonial.image}
								alt={testimonial.name}
								class="mx-auto h-24 w-24 rounded-full object-cover lg:mx-0 lg:h-96 lg:w-96"
							/>
						</div>
						<div class="lg:pb-4">
							<blockquote class="mt-2.5 leading-6 lg:text-xl">
								<p>{testimonial.text}</p>
							</blockquote>

							<p class="mt-2 italic lg:mt-8">
								{testimonial.name}, {testimonial.age}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="absolute top-9 flex w-full items-center justify-between px-3 lg:top-44">
			<button on:click={() => emblaApi.scrollPrev()}>
				<img src={ArrowLeft.src} alt="Left arrow" class="h-6 w-6 lg:h-8 lg:w-8" />
				<span class="sr-only">Previous Testimonial</span>
			</button>
			<button on:click={() => emblaApi.scrollNext()}>
				<img src={ArrowRight.src} alt="Right arrow" class="h-6 w-6 lg:h-8 lg:w-8" />
				<span class="sr-only">Next Testimonial</span>
			</button>
		</div>
	</div>
</section>

<style>
	.embla__slide {
		flex: 0 0 100%;
	}
</style>
