import { NodeSpec, Node as PMNode, Schema } from 'prosemirror-model';
import type { Component } from 'svelte';
import { Plugin } from 'prosemirror-state';

export interface NodeProps<T> {
	attrs: T;
	ref: HTMLElement;
}

export interface ExtensionsData {
	schema: Schema;
	plugins: Plugin[];
	nodes: { [name: string]: NodeSpec };
}

export interface SveltePMExtension {
	name: string;
	svelteNodes?: {
		[name: string]: SveltePMNode<any>;
	};
}

export interface SveltePMNode<T> {
	attrs?: T;
	selectors?: string[];
	schema: NodeSpec;
	component?: Component<NodeProps<T>>;
}

export interface PMExtension {
	nodes: { [name: string]: NodeSpec };
}
