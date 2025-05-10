import { default as Transcript, transcriptAttrs, transcriptSchema } from './Transcript.svelte';
import { SveltePMExtension } from '../../typings/extension.js';

export function transcriptExtension() {
	return {
		name: 'transcript' as const,
		svelteNodes: {
			transcript: {
				attrs: transcriptAttrs,
				schema: transcriptSchema,
				component: Transcript
			}
		}
	} satisfies SveltePMExtension;
}
