<script lang="ts">
  import type { DonationMethod } from '@data/real/donations';

  import Button from '@components/Button.svelte';
  import { createTabs, melt } from '@melt-ui/svelte';
  import clsx from 'clsx';
  import SvelteMarkdown from 'svelte-markdown';

  import List from './markdown/List.svelte';
  import ListItem from './markdown/ListItem.svelte';
  import Paragraph from './markdown/Paragraph.svelte';

  const {
    elements: { content, list, root, trigger },
    states: { value },
  } = createTabs({
    autoSet: false,
  });

  const { possibilities }: { possibilities: DonationMethod[] } = $props();
</script>

<div use:melt={$root} class="mt-20 hidden lg:block">
  <div use:melt={$list} class="tab-list grid grid-cols-4 grid-rows-4 items-stretch gap-x-16">
    {#each possibilities as possibility (possibility.title)}
      <button
        use:melt={$trigger(possibility.title)}
        class="row-span-4 grid grid-rows-subgrid items-center justify-between text-center"
      >
        <div
          class={clsx(
            'mx-auto flex h-56 w-56 items-center justify-center rounded-full shadow-lg transition-colors',
            {
              'bg-green-500': $value !== possibility.title,
              'border-2 border-black bg-green-200': $value === possibility.title,
            },
          )}
        >
          <img alt="" src={possibility.icon.src} />
        </div>
        <h3 class="mt-4 font-serif text-4xl font-bold">{possibility.title}</h3>
        <p class="mt-4">{possibility.description}</p>
        <Button
          class="mt-8"
          text="Schreibe uns"
          href="mailto:kontakt@youngvision.org"
          color="dark"
        />
      </button>
    {/each}
  </div>
  <div>
    {#each possibilities as possibility, i (possibility.title)}
      <div use:melt={$content(possibility.title)} class="pt-40 pb-16 text-2xl">
        <h3 class="text-center font-serif text-5xl font-bold">{possibility.title}</h3>
        <div
          class={clsx('mt-16 flex justify-between gap-x-28', {
            'flex-row-reverse': i % 2 === 1,
          })}
        >
          <!-- TODO: For some reason only Sachspenden has no top margin... -->
          <div class:mt-16={possibility.title != 'Sachspenden'}>
            <p class="max-w-prose">{possibility.text}</p>
            {#if !possibility.buttonAtEnd}
              <Button
                class="mt-8"
                text="Schreibe uns"
                href="mailto:kontakt@youngvision.org"
                color="dark"
              />
            {/if}
            {#if possibility.extraText != null}
              <SvelteMarkdown
                source={possibility.extraText}
                renderers={{ list: List, listitem: ListItem, paragraph: Paragraph }}
              />
            {/if}
            {#if possibility.buttonAtEnd}
              <Button
                class="mt-8"
                text="Schreibe uns"
                href="mailto:kontakt@youngvision.org"
                color="dark"
              />
            {/if}
          </div>
          <div class="h-[38rem] w-[28rem] flex-none">
            <img
              src={possibility.image.src}
              {...possibility.image.attributes}
              class="h-full w-full bg-gray-300 object-cover object-center"
              sizes="28rem"
              alt={possibility.title}
            />
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  :global(.tab-list) {
    grid-template-rows: 14rem repeat(3, minmax(0, 1fr));
  }
</style>
