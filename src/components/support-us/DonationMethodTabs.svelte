<script>
  import clsx from 'clsx';
  import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';
  import SvelteMarkdown from 'svelte-markdown';

  import Button from '@components/Button.svelte';

  import Paragraph from './markdown/Paragraph.svelte';
  import List from './markdown/List.svelte';
  import ListItem from './markdown/ListItem.svelte';

  /** @type {import('@data/donations').DonationMethod[]} **/
  export let possibilities;
</script>

<TabGroup class="mt-20 hidden lg:block">
  <TabList class="tab-list grid grid-cols-4 grid-rows-4 items-stretch gap-x-16">
    <Tab class="hidden" />
    {#each possibilities as possibility}
      <Tab
        class="row-span-4 grid grid-rows-subgrid items-center justify-between text-center"
        let:selected
      >
        <div
          class={clsx(
            'mx-auto flex h-56 w-56 items-center justify-center rounded-full shadow-lg transition-colors',
            {
              'border-2 border-black bg-green-200': selected,
              'bg-green-500': !selected,
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
      </Tab>
    {/each}
  </TabList>
  <TabPanels>
    <!-- TODO: is there a better way than this hidden tab? -->
    <TabPanel class="hidden" />
    {#each possibilities as possibility, i}
      <TabPanel class="pb-16 pt-40 text-2xl">
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
                renderers={{ paragraph: Paragraph, list: List, listitem: ListItem }}
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
              alt={possibility.title}
            />
          </div>
        </div>
      </TabPanel>
    {/each}
  </TabPanels>
</TabGroup>

<style>
  :global(.tab-list) {
    grid-template-rows: 14rem repeat(3, minmax(0, 1fr));
  }
</style>
