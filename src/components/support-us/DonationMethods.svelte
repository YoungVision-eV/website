<script>
  import SvelteMarkdown from 'svelte-markdown';
  import { createAccordion, melt } from '@melt-ui/svelte';
  import { slide } from 'svelte/transition';

  import JakobPortrait from '@assets/team-members/jakob-portait.jpeg';
  import Button from '@components/Button.svelte';
  import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';

  import clsx from 'clsx';
  import { getDonationMethods } from '@data/donations';
  import Paragraph from './markdown/Paragraph.svelte';
  import List from './markdown/List.svelte';
  import ListItem from './markdown/ListItem.svelte';

  const possibilities = getDonationMethods();

  const {
    elements: { content, item, trigger, root },
    helpers: { isSelected },
  } = createAccordion();
</script>

<section class="py-16 lg:py-24">
  <div class="mt-4 lg:px-20">
    <h2 class="font-serif text-2xl font-bold">Weitere Möglichkeiten, uns zu unterstützen</h2>
    <p class="mt-3 text-xl lg:mt-4">
      Deine Unterstützung ist der Schlüssel, um unsere Mission voranzutreiben und jungen Menschen
      transformative Erfahrungen zu ermöglichen. Neben finanziellen Spenden gibt es auch andere
      wertvolle Wege, wie du uns unterstützen kannst:
    </p>
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
              <svelte:component this={possibility.icon} />
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
                  src={possibility.image}
                  class="h-full w-full bg-gray-300 object-cover object-center"
                  alt={possibility.title}
                />
              </div>
            </div>
          </TabPanel>
        {/each}
      </TabPanels>
    </TabGroup>
    <ul class="mt-16 px-4 lg:hidden" use:melt={$root}>
      {#each possibilities as possibility}
        <li class="group mt-24 first:mt-0" use:melt={$item(possibility.title)}>
          <div>
            <button
              class="flex items-center gap-x-4 text-left group-even:flex-row-reverse"
              use:melt={$trigger(possibility.title)}
            >
              <div
                class={clsx(
                  'flex h-40 w-40 flex-none items-center justify-center rounded-full transition-colors',
                  {
                    'border-2 border-black bg-green-200': $isSelected(possibility.title),
                    'bg-green-500': !$isSelected(possibility.title),
                  },
                )}
              >
                <svelte:component this={possibility.icon} />
              </div>
              <div class="group-even:text-right">
                <h3 class="text-xl">{possibility.title}</h3>
                <p class="mt-3">{possibility.description}</p>
              </div>
            </button>
            {#if $isSelected(possibility.title)}
              <div
                title={possibility.title}
                class="pb-8 pt-4"
                use:melt={$content(possibility.title)}
                transition:slide
              >
                <p>{possibility.text}</p>
                <div class="mt-10 h-[27rem] w-full flex-none">
                  <img
                    src={possibility.image}
                    alt={possibility.title}
                    class="h-full w-full bg-gray-300 object-cover object-center"
                  />
                </div>
              </div>
            {/if}
          </div>
          <Button
            class="group-odd:float-right"
            text="Schreibe uns"
            href="mailto:kontakt@youngvision.org"
            color="dark"
          />
        </li>
      {/each}
    </ul>
  </div>
  <div
    class="mt-24 gap-x-28 border-y-2 border-yellow-500 bg-yellow-900 px-4 py-10 lg:mx-20 lg:mt-36 lg:flex lg:flex-row lg:rounded-2xl lg:border-2 lg:px-24"
  >
    <h3 class="font-serif text-2xl font-bold lg:hidden">Falls sie Fragen haben!</h3>
    <img
      src={JakobPortrait.src}
      alt="Jakob"
      class="mx-auto mt-5 h-56 w-56 rounded-2xl bg-gray-300 object-cover object-center lg:mx-0 lg:mt-0"
    />
    <div>
      <h3 class="hidden text-center font-serif text-4xl font-bold lg:block">
        Falls sie Fragen haben!
      </h3>
      <dl class="mt-8 grid grid-cols-1 lg:grid-cols-2">
        <dt class="font-bold">Ansprechpartner</dt>
        <dd>Jakob Voigt</dd>

        <dt class="mt-5 font-bold lg:mt-0">Email</dt>
        <dd>
          <a class="text-gray-800 underline" href="mailto:jakob.voigt@youngvision.org"
            >jakob.voigt@youngvision.org</a
          >
        </dd>
      </dl>
      <Button class="mt-7" text="Schreibe uns" href="mailto:kontakt@youngvision.org" color="dark" />
    </div>
  </div>
</section>

<style>
  :global(.tab-list) {
    grid-template-rows: 14rem repeat(3, minmax(0, 1fr));
  }
</style>
