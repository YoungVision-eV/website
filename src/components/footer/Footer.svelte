<script>
	import ArrowRight from '@assets/icons/ArrowRight.svelte';
	import YoungVisionLogoFull from '@assets/icons/YoungVisionLogoFull.svelte';
</script>

<footer class="w-full bg-green-50 px-4 py-6 lg:px-20">
	<YoungVisionLogoFull class="h-10 w-auto" />
	<span class="sr-only">YoungVision</span>

	<div class="mt-4 justify-between md:flex">
		<dl class="text-white">
			<dt class="font-bold">Adresse</dt>
			<dd>Am bhf 4<br />16307 Mescherin</dd>
			<dt class="mt-3 font-bold lg:mt-6">E-Mail</dt>
			<dd>
				<a class="hover:underline" href="mailto:kontakt@youngvision.org">kontakt@youngvision.org</a>
			</dd>
		</dl>
		<div class="mt-3 md:mt-0 md:w-3/5 lg:w-1/2">
			<div class="bg-green-50">
				<h2 class="text-xl font-bold text-orange">Für unseren Newsletter anmelden</h2>
				<div class="mt-2">
					<label for="email" class="sr-only">Email</label>
					<div class="relative">
						<input
							type="email"
							name="email"
							id="email"
							autocomplete="email"
							class="focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
							placeholder="you@example.com"
						/>
						<div class="absolute inset-y-0 right-0 flex items-center pr-3">
							<button type="submit" class="text-green-200">
								<span class="sr-only">Sign up</span>
								<ArrowRight /></button
							>
						</div>
					</div>
				</div>
			</div>
			<div class="mt-6 flex justify-between text-white md:justify-end md:gap-x-8">
				<a class="underline" href="/datenschutz">Datenschutz</a>
				<a aria-disabled="true" class="pointer-events-none opacity-50" href="/transparency"
					>Transparenz</a
				>
				<a class="underline" href="/impressum">Impressum</a>
			</div>
		</div>
	</div>
</footer>
