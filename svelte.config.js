import { vitePreprocess } from '@astrojs/svelte';
import { preprocessMeltUI } from '@melt-ui/pp';
import sequence from 'svelte-sequential-preprocessor';

export default {
	preprocess: sequence([vitePreprocess({}), preprocessMeltUI()]),
};
