import Equation, { equationAttrs, equationSchema } from './Equation.svelte';
import { SvelteNodeView } from '@prosemirror-svelte/core';
import type { SveltePMExtension } from '@prosemirror-svelte/core';
import type { Component } from 'svelte';
import { Editor } from '@prosemirror-svelte/core';

export function equationExtension() {
	return {
		name: 'equation' as const,
		svelteNodes: {
			equation: {
				attrs: equationAttrs,
				schema: equationSchema,
				nodeView: (editor) => SvelteNodeView.fromComponent(editor, Equation as unknown as Component)
				// component: Equation
			}
		}
	} satisfies SveltePMExtension;
}
