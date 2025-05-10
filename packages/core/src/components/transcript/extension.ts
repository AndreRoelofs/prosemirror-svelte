import {
	default as Transcript,
	transcriptAttrs,
	transcriptSchema,
	TranscriptAttrs
} from './Transcript.svelte';
import type { Component } from 'svelte';

import { NodeProps, SveltePMExtension } from '../../typings/extension.js';
import { SvelteNodeView } from '../../SvelteNodeView.js';

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
