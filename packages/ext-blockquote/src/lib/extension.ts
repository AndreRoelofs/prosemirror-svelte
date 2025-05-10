import Blockquote, { blockquoteAttrs, blockquoteSchema } from './Blockquote.svelte';
import type { SveltePMExtension } from '@prosemirror-svelte/core';

export function blockquoteExtension() {
	return {
		name: 'blockquote' as const,
		nodes: {
			blockquote: {
				attrs: blockquoteAttrs,
				schema: blockquoteSchema,
				component: Blockquote
			}
		}
	} satisfies SveltePMExtension;
}
