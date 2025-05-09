import { default as Transcript } from './Transcript.svelte';
import { SveltePMExtension } from '../../typings/extension.js';

export function transcriptExtension() {
	return {
		name: 'transcript' as const,
		svelteNodes: {
			transcript: {
				attrs: {},
				schema: {},
				component: Transcript
			}
		}
	} satisfies SveltePMExtension;
}
