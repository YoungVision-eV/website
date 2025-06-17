import { writable } from 'svelte/store';

const currentProgress = writable<{
  amount: number;
  people: number;
}>({
  amount: 0,
  people: 0,
});
export default currentProgress;
