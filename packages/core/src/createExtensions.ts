import { NodeSpec, Schema } from 'prosemirror-model';
import { default as Editor } from './Editor.svelte';
import { SveltePMExtension, PMExtension, ExtensionsData } from './typings/index.js';
import { createNodeSpec } from './extensions/createNodeSpec.js';
import { Plugin } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import { schema as defaultSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';

export async function createExtensions(
	editor: Editor,
	extensions: SveltePMExtension[] = []
): Promise<ExtensionsData> {
	const nodes: { [key: string]: NodeSpec } = {};
	for (const ext of extensions) {
		for (const nodeKey in ext.svelteNodes) {
			// TODO: make sure the node is not duplicate
			const node = ext.svelteNodes[nodeKey];
			nodes[nodeKey] = await createNodeSpec(node);
		}
	}

	// const schema = new Schema({
	// 	nodes: {
	// 		doc: {
	// 			content: 'block+'
	// 		},
	// 		text: {
	// 			group: 'inline'
	// 		},
	// 		...nodes
	// 	}
	// 	marks: extData.marks
	// });
	const schema = new Schema({
		nodes: addListNodes(defaultSchema.spec.nodes, 'paragraph block*', 'block').append(nodes),
		marks: defaultSchema.spec.marks
	});

	const plugins: Plugin[] = [];

	return {
		nodes,
		schema,
		plugins
	};
}
