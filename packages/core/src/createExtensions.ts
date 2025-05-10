import { NodeSpec, Schema } from 'prosemirror-model';
import { default as Editor } from './Editor.svelte';
import { SveltePMExtension, PMExtension, ExtensionsData } from './typings/index.js';
import { createNodeSpec } from './extensions/createNodeSpec.js';
import { Plugin } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import { schema as defaultSchema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { NodeViewConstructor } from 'prosemirror-view';

export async function createExtensions(
	editor: Editor,
	extensions: SveltePMExtension[] = []
): Promise<ExtensionsData> {
	const nodes: { [key: string]: NodeSpec } = {};
	const nodeViews: { [key: string]: NodeViewConstructor } = {};
	for (const ext of extensions) {
		for (const nodeKey in ext.svelteNodes) {
			// TODO: make sure the node is not duplicate
			const node = ext.svelteNodes[nodeKey];
			nodes[nodeKey] = await createNodeSpec(node);
			if (node.nodeView) {
				nodeViews[nodeKey] = node.nodeView(editor);
			}
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
		nodes: {
			doc: {
				content: 'block+'
			},
			text: {
				group: 'inline'
			},
			...nodes
		},
		marks: defaultSchema.spec.marks
	});

	// const schema = new Schema({
	// 	nodes: addListNodes(defaultSchema.spec.nodes, 'paragraph block*', 'block').append(nodes),
	// 	marks: defaultSchema.spec.marks
	// });

	const plugins: Plugin[] = [];

	return {
		nodes,
		nodeViews,
		schema,
		plugins
	};
}
