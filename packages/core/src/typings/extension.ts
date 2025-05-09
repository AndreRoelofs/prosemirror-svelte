import { NodeSpec, Node as PMNode, Schema } from 'prosemirror-model';
import type { Component } from 'svelte';
import { Plugin } from 'prosemirror-state';

export interface ExtensionsData {
	schema: Schema;
	plugins: Plugin[];
	nodes: { [name: string]: NodeSpec };
}

export interface SveltePMExtension {
	id: string;
	svelteNodes?: {
		[name: string]: SveltePMNode<any>;
	};
}

export interface SveltePMNode<T> {
	attrs?: T;
	selectors?: string[];
	schema: NodeSpec;
	component?: Component;
}

export interface PMExtension {
	nodes: { [name: string]: NodeSpec };
}
