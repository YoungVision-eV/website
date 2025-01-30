<script lang="ts">
  import type { YearlyEvent } from '@data';

  import ProjectBackground3 from '@assets/events/projects-bg-lg-3.jpg';

  export let events: YearlyEvent[];

  let filter_for_all = true;

  function toggleForAll() {
    filter_for_all = !filter_for_all;
  }

  $: filteredEvents = events.filter((e) => e.for_all === filter_for_all);
</script>

<section class="relative mx-auto mb-20 max-w-[80rem] px-4 pt-14 lg:px-20 lg:pt-24">
  <img src={ProjectBackground3.src} alt="" class="absolute -left-0 -z-10 mt-32" />
  <h2 class="font-serif text-2xl font-bold">Unsere jährlichen Veranstaltungen</h2>
  <p class="mt-5 max-w-prose">
    Unsere jährlichen Veranstaltungen sind ein fester Bestandteil unseres YoungVision-Kalenders. Sie
    bieten eine entspannte Gelegenheit, zusammenzukommen, zu wachsen, Kontakte zu knüpfen und das
    Leben in vollen Zügen zu genießen. Hier erfährst du mehr über diese besonderen Anlässe, die
    unsere Gemeinschaft jedes Jahr aufs Neue bereichern und inspirieren.
  </p>
  <div class="mt-3 flex flex-row">
    <div class="flex items-center">
      <input
        class="h-7 w-7"
        type="checkbox"
        id="for-all"
        on:click={toggleForAll}
        checked={filter_for_all}
      />
      <label class="ml-4" for="for-all">Für Alle</label>
    </div>
    <div class="ml-10 flex items-center lg:ml-28">
      <input
        class="h-7 w-7"
        type="checkbox"
        id="only-members"
        on:click={toggleForAll}
        checked={!filter_for_all}
      />
      <label class="ml-4" for="only-members">Nur Mitglieder</label>
    </div>
  </div>
  <ul class="flex flex-col lg:mt-12 lg:grid lg:grid-cols-2 lg:gap-10">
    {#each filteredEvents as event}
      <li
        class="mt-12 rounded-2xl shadow-lg lg:mt-0 {event.for_all
          ? 'bg-yellow-700'
          : 'bg-light-green'}"
      >
        <img
          alt=""
          src={event.image.src.src}
          {...event.image.src.attributes}
          class="max-h-64 w-full rounded-t-2xl object-cover"
        />
        <div class="flex p-6">
          <div class="mt-4 flex flex-col items-center">
            <div class="font-serif text-5xl font-bold">{event.day}</div>
            <div>{event.month}</div>
          </div>
          <div class="ml-10">
            <h3 class="inline-block font-bold lg:text-xl">{event.title}</h3>
            {#if event.future}
              <span class="italic">ab {event.future}</span>
            {/if}
            <p class="mt-3">{event.short_description}</p>
            <p class="mt-3 inline-block rounded-full bg-white px-5">
              {event.for_all ? 'Für Alle' : 'Nur Mitglieder'}
            </p>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</section>
