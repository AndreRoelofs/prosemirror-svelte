import Transcript, { transcriptAttrs, transcriptSchema } from './Transcript.svelte';

import type { Extension } from '../../typings/index.js';

export const transcriptExtension = (position: number) => {
	return {
		name: 'transcript' as const,
		nodes: {
			transcript: {
				id: 'a5a1f770-8e6a-4d87-88d2-ba06dff789c8',
				position,
				attrs: transcriptAttrs,
				schema: transcriptSchema,
				component: Transcript as any
			}
		}
	} satisfies Extension;
};
