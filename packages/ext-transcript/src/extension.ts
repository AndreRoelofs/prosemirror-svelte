import { default as Transcript, transcriptAttrs, transcriptSchema } from './Transcript.svelte';
import type { Component } from 'svelte';

import { SveltePMExtension } from '@prosemirror-svelte/core';
import { SvelteNodeView } from '@prosemirror-svelte/core';

export function transcriptExtension() {
	return {
		name: 'transcript' as const,
		svelteNodes: {
			transcript: {
				attrs: transcriptAttrs,
				schema: transcriptSchema,
				// component: Transcript,
				nodeView: (editor: any) =>
					SvelteNodeView.fromComponent(editor, Transcript as unknown as Component)
			}
		}
	} satisfies SveltePMExtension;
}
