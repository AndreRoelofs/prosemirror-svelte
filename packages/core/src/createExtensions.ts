import { default as ProsemirrorEditor } from './components/ProsemirrorEditor.svelte';
import type { EurNode, ExtensionData, Extension } from './typings';
import type { NodeSpec } from 'prosemirror-model';
export function createExtensions(editor: ProsemirrorEditor, extensions: Extension[]) {
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
}
