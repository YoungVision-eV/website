<script lang="ts">
  import clsx from 'clsx';

  import { createCollapsible, melt } from '@melt-ui/svelte';
  import { slide } from 'svelte/transition';

  import type { Exercise } from '@data/exercises';
  import ChevronUp from '@assets/icons/ChevronUp.svelte';
  import ChevronDown from '@assets/icons/ChevronDown.svelte';

  export let exercises: Exercise[];

  const {
    elements: { root, content, trigger },
    states: { open },
  } = createCollapsible();
</script>

<div class="hidden lg:mt-40 lg:block" use:melt={$root}>
  <div class="grid grid-cols-6 gap-x-12">
    {#each exercises.slice(0, 3) as exercise}
      <div class="col-span-2">
        <div class="px-20 lg:px-0">
          <img
            srcSet={exercise.image.srcSet.attribute}
            {...exercise.image.attributes}
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
