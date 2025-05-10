import {
	default as Transcript,
	transcriptAttrs,
	transcriptSchema,
	TranscriptAttrs
} from './Transcript.svelte';
import type { Component } from 'svelte';

import { NodeProps, SveltePMExtension } from '../../typings/extension.js';

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
