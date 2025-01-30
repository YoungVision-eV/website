<script lang="ts">
  import Circle from '@assets/icons/Circle.svelte';
  import clsx from 'clsx';

  let className = '';
  export { className as class };
  export let text: string;
  export let color: 'bright' | 'dark';
  export let href: string = '#';
  export let download: string | undefined = undefined;
</script>

<a
  {download}
  {href}
  class={clsx(
    'inline-flex items-center gap-x-4 p-4 px-8 font-bold',
    {
      // black background, white text
      'bg-green-50': color === 'dark',
      // white background, black text
      'bg-white': color === 'bright',
      'text-black': color === 'bright',
      'text-white': color === 'dark',
    },
    className,
  )}
>
  <Circle />
  {text}
</a>
