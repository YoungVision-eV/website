<script lang="ts">
  import { createCollapsible, melt } from '@melt-ui/svelte';
  import { fade, slide } from 'svelte/transition';

  const {
    elements: { content, root, trigger },
    states: { open },
  } = createCollapsible();
</script>

<div use:melt={$root} data-testid="fundraising-info" class="mx-auto max-w-prose text-lg">
  <p>
    Du willst junge Menschen auf ihrer Reise zur persönlichen Entwicklung und zur aktiven Gestaltung
    unserer Gesellschaft unterstützen?
  </p>
  {#if $open}
    <div class="mt-2 flex flex-col gap-y-4" transition:slide use:melt={$content}>
      <p>
        Uns gibt es für alle jungen Menschen aus eurem Leben. Eure Kinder, Enkel und Freund:innen.
        Viele von uns fühlen sich orientierungslos, überfordert, einsam und verlieren die Hoffnung
        in eine lebenswerte Zukunft.
      </p>
      <p>
        Mit deiner Hilfe werden wir eine halbe Stelle einrichten. Diese wird unsere Struktur
        professionalisieren und uns ermöglichen mehr Menschen mit unserer Arbeit zu erreichen. Wir
        werden noch diesen Herbst einen Workshop zum Thema "Purpose" organisieren, um zu
        Orientierung in unserem Leben und in Gemeinschaft zu forschen.
      </p>
    </div>
  {/if}

  <button use:melt={$trigger} class="mt-8 flex w-full flex-col items-center justify-center lg:mt-6">
    <span class="text-sm">{$open ? 'Weniger' : 'Mehr'}</span>
    <div>
      <svg
        class="mt-2"
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="9"
        viewBox="0 0 13 9"
        fill="none"
      >
        {#if $open}
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
  </button>
</div>
