<script>
	import Button from '$lib/components/Button.svelte';
</script>

<section class="relative mb-28 mt-14 px-4 lg:mt-28 lg:px-20">
	<enhanced:img
		src="$lib/assets/projects-bg-lg-4.jpg"
		alt=""
		class="absolute -bottom-28 right-0 -z-10"
	/>
	<h2 class="font-serif text-2xl font-bold">Collaborations with InKontakt</h2>
	<div class="lg:flex lg:flex-row lg:items-stretch">
		<img class="mt-12 h-[26rem] w-full" src="https://placehold.co/600x750" alt="Placeholder" />
		<div class="lg:ml-28 lg:flex lg:flex-col lg:items-start lg:justify-around">
			<h3 class="mt-10 font-bold">LOREM IPSUM - Sommer</h3>
			<p class="mt-2">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
				do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet,
				consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
				aliqua.
			</p>
			<p class="mt-6">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
				do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</p>
			<Button class="mt-12" text="Call to Action" color="dark" />
		</div>
	</div>
</section>
