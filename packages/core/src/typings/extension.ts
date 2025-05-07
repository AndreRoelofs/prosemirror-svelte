import { MarkSpec, NodeSpec, Node as PMNode, Schema } from 'prosemirror-model';
import type { SvelteComponent } from 'svelte';

export interface ExtensionData {
	nodes: { [name: string]: NodeSpec };
	svelteNodes: { [name: string]: EurNode<any> };
}

export interface NodeAttrs {
	[attr: string]: any;
}

export interface EurNode<T extends NodeAttrs | undefined> {
	id: string;
	position: number;
	attrs: T;
	schema?: NodeSpec;

	component?: typeof SvelteComponent<NodeProps<T>>;
}

export interface NodeProps<T> {
	node: PMNode | undefined;
	attrs: T;
	contentDOM: (node: HTMLElement) => void;
}

export interface Extension {
	name: string;
	nodes?: {
		[name: string]: EurNode<any>;
	};
}
