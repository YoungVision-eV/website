<script>
  import clsx from 'clsx';

  import { createAccordion, melt } from '@melt-ui/svelte';
  import { slide } from 'svelte/transition';

  import Button from '@components/Button.svelte';

  const {
    elements: { content, item, trigger, root },
    helpers: { isSelected },
  } = createAccordion();

  /** @type {import('@data/donations').DonationMethod[]} **/
  export let possibilities;
</script>

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
            <img alt="" src={possibility.icon.src} />
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
                src={possibility.image.src}
                {...possibility.image.attributes}
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
