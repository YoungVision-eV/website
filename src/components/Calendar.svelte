<script lang="ts">
  import clsx from 'clsx';

  import { fade, blur } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import type { EventCalendarEntry } from '@data';

  export let events: [EventCalendarEntry, EventCalendarEntry, EventCalendarEntry];

  const TODAY = new Date();

  function relativeDate(date: Date): 'Vorbei' | 'Demnächst' {
    if (date < TODAY) {
      return 'Vorbei';
    }
    return 'Demnächst';
  }

  const initialEvent: number = events.findIndex((e) => e.date >= TODAY);
  // TODO: should this be the event itself instead of the index?
  // Perhaps we should also just use embla
  let selectedEvent = initialEvent >= 0 ? initialEvent : 0; // findIndex returns -1 if not found

  const ANIMATION_DURATION = 300;

  const location = tweened(selectedEvent, { duration: ANIMATION_DURATION, easing: cubicOut });
  $: location.set(selectedEvent);
  $: currentEvent = events[selectedEvent];
</script>

<div class="mx-auto grid w-full max-w-[80rem] grid-cols-4 lg:grid-cols-9 lg:px-20">
  <div
    class="col-start-1 col-end-5 row-end-2 lg:relative lg:col-end-6 lg:row-start-1 lg:row-end-4 lg:rounded-l-2xl lg:rounded-r-none"
  >
    <div class="relative h-[22rem] w-full lg:h-full">
      {#key selectedEvent}
        <img
          transition:blur={{
            duration: ANIMATION_DURATION,
            easing: cubicOut,
          }}
          id={`event-${selectedEvent + 1}`}
          {...currentEvent.image.src.attributes}
          src={currentEvent.image.src.src}
          srcset={currentEvent.image.src.srcSet.attribute}
          alt={currentEvent.image.alt}
          sizes="(min-width: 1024px) 50vw, 100vw"
          class="absolute left-0 top-0 h-full w-full rounded-t-2xl object-cover transition-opacity lg:rounded-l-2xl lg:rounded-tr-none"
        />
      {/key}
    </div>
    <div
      class="hidden lg:absolute lg:inset-y-0 lg:right-[27%] lg:flex lg:flex-col lg:justify-center"
    >
      <div class="relative">
        <!-- HACK: this transformation calculation feels bad
 								The calculation is: 100% for the height of the marker plus 0.25rem for the gap
				-->
        <svg
          class="absolute h-5 w-5 text-white"
          style="top: 0%; transform: translateY(calc({$location * 100}% + {$location * 0.25}rem))"
          fill="currentColor"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <div class="h-full lg:flex lg:flex-col lg:justify-center lg:gap-y-1">
          {#each events as event, index}
            <button on:click={() => (selectedEvent = index)} aria-label={event.title}>
              <svg
                class="h-5 w-5 text-yellow-500 text-opacity-60"
                fill="currentColor"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="50" />
              </svg>
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
  <ul
    id="calendar"
    class="relative z-10 col-span-4 row-span-3 -mt-4 grid grid-cols-subgrid grid-rows-subgrid
		lg:col-span-5 lg:col-start-5 lg:row-start-1 lg:mt-0"
    role="tablist"
  >
    <div
      class={clsx(
        'absolute z-20 h-1/3 w-full bg-background lg:-ml-8 lg:w-[calc(100%+2rem)] lg:rounded-l-2xl',
        selectedEvent === 0 ? 'rounded-t-2xl' : '',
      )}
      style="top: 0%; transform: translateY({$location * 100}%)"
    />
    {#each events as event, index}
      <li
        role="tab"
        aria-selected={index === selectedEvent}
        class={clsx(
          'col-span-4 grid grid-cols-subgrid bg-yellow-700 transition-colors lg:col-span-5 lg:bg-yellow-500 lg:bg-opacity-60',
          index === 0 ? 'rounded-t-2xl lg:rounded-tl-none' : '',
        )}
      >
        <button
          aria-labelledby={`title-${event.title}`}
          class="relative col-span-4 grid h-full grid-cols-subgrid items-center py-7 text-left lg:col-span-5 lg:py-1"
          on:click={() => (selectedEvent = index)}
          disabled={selectedEvent === index}
        >
          <div class="z-30 flex flex-col items-center justify-center lg:py-6">
            <span class="font-serif text-5xl font-bold">{event.date.getDate()}</span>
            <span>{event.date.toLocaleString('de-DE', { month: 'long' })}</span>
            <p class="text-sm italic text-gray-700 lg:text-base">
              {relativeDate(event.date)}
            </p>
          </div>
          <div class="z-30 col-span-3 px-4 lg:col-span-4 lg:px-10 lg:py-9">
            <h3 class="font-bold lg:text-xl" id={`title-${event.title}`}>{event.title}</h3>
            <p>{event.description}</p>
          </div>
          <div class="absolute bottom-5 right-5 z-30">
            {#if index === selectedEvent && event.link}
              <a
                transition:fade={{ duration: ANIMATION_DURATION, easing: cubicOut }}
                class="italic underline"
                href={event.link}>Infos</a
              >
            {/if}
          </div>
        </button>
      </li>
    {/each}
  </ul>
</div>
