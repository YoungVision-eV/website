import { writable } from 'svelte/store';

const currentProgress = writable<number>(0);
export default currentProgress;
