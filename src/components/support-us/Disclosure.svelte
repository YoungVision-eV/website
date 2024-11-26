<script>
  import { slide, fade } from 'svelte/transition';
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@rgossiaux/svelte-headlessui';

  const benefits = [
    'Unsere Arbeit langfristig ermöglichen',
    'Regelmäßige Updates',
    'Jährliche Dankes​karte',
    'Spenden​bescheinigung',
    'Mitgliedschaft jederzeit kündbar',
  ];
</script>

<Disclosure data-testid="benefits" let:open>
  {#if open}
    <div transition:slide>
      <DisclosurePanel class="pb-12 pt-16 lg:px-16" static>
        <h3 class="font-serif text-2xl font-bold">Vorteile</h3>
        <ol id="benefits" class="grid grid-cols-3 py-12 lg:gap-y-14">
          {#each benefits as benefit, index}
            <li class="group col-span-3 grid grid-cols-subgrid items-center">
              <div
                class="flex flex-none flex-row group-odd:order-last group-odd:justify-end
									lg:group-odd:order-first lg:group-odd:justify-start"
              >
                <div
                  class="flex h-24 w-24 flex-none items-center justify-center rounded-full
										bg-gray-300 font-serif text-5xl font-bold lg:h-28 lg:w-28 lg:bg-green-50 lg:text-white"
                >
                  {index + 1}
                </div>
              </div>
              <p class="col-span-2 ml-2 text-sm lg:ml-8 lg:mr-5 lg:text-xl">
                {benefit}
              </p>
            </li>
          {/each}
        </ol>
        <div class="grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-x-5 lg:text-xl">
          <p>
            Dein Beitrag, unsere Vision: Deine Unterstützung ermöglicht es uns, inspirierende
            Projekte und Veranstaltungen für junge Menschen zu schaffen und eine unterstützende
            Gemeinschaft aufzubauen.
          </p>
          <p>
            Wir schätzen deine Beteiligung und freuen uns darauf, gemeinsam eine bessere Zukunft zu
            gestalten.
          </p>
        </div>
      </DisclosurePanel>
    </div>
  {/if}
  <DisclosureButton class="mt-12 flex w-full flex-col items-center justify-center lg:mt-8">
    <span class="text-sm">{open ? 'Weniger' : 'Mehr'}</span>
    <div>
      <svg
        class="mt-2"
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="9"
        viewBox="0 0 13 9"
        fill="none"
      >
        {#if open}
          <path
            transition:fade
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 6.58449L1.51667 8.12085L6.5 3.0728L11.4833 8.12085L13 6.58449L6.5 7.05719e-05L0 6.58449Z"
            fill="#686B6F"
          />
        {:else}
          <path
            transition:fade
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13 1.53636L11.4833 0L6.5 5.04805L1.51667 0L0 1.53636L6.5 8.12078L13 1.53636Z"
            fill="#686B6F"
          />
        {/if}
      </svg>
    </div>
  </DisclosureButton>
</Disclosure>

<style>
  @media (min-width: 1024px) {
    #benefits {
      grid-template-columns:
        7rem repeat(2, minmax(0, 1fr)) 7rem repeat(2, minmax(0, 1fr))
        7rem repeat(2, minmax(0, 1fr));
    }
  }
</style>
