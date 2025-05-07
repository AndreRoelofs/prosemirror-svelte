import { default as ProsemirrorEditor } from './components/ProsemirrorEditor.svelte';
import type { EurNode, ExtensionData, Extension } from './typings';
import type { NodeSpec } from 'prosemirror-model';
import { createNodeSpec } from './extensions/createNodeSpec.js';
import { Schema } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import { Plugin } from 'prosemirror-state';

export interface Initialized extends ExtensionData {
	plugins: Plugin[];
	schema: Schema;
}

export function createExtensions(editor: ProsemirrorEditor, extensions: Extension[]): Initialized {
	const extData: ExtensionData = {
		nodes: {},
		svelteNodes: {}
	};

	extensions.forEach((extension) => {
		if (!extension.nodes) return;
		for (const id in extension.nodes) {
			if (id in extData.svelteNodes) {
				throw new Error(`Node ${id} already exists`);
			}
			const value = extension.nodes[id];
			extData.svelteNodes[id] = value;
			extData.nodes[id] = createNodeSpec(value);
		}
	});

	const schema = new Schema({
		nodes: {
			doc: {
				content: 'block+'
			},
			text: {
				group: 'inline'
			}
		},
		...extData.nodes
	});

	const plugins = [
		...extensions.reduce(
			(acc, ext) => [...acc, ...((ext.plugins && ext.plugins(editor, schema)) || [])],
			[] as Plugin[]
		)
	];

	return {
		...extData,
		plugins,
		schema
	};
}
