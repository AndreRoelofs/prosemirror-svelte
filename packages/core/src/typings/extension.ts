import { NodeSpec, Node as PMNode, Schema } from 'prosemirror-model';
import type { Component } from 'svelte';
import { MarkViewConstructor, NodeViewConstructor } from 'prosemirror-view';
import { Plugin } from 'prosemirror-state';
import { default as Editor } from '../Editor.svelte';
export interface NodeProps<T> {
	node: PMNode;
	ref?: HTMLElement;
	attrs: T;
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
	// component?: Component<NodeProps<T>>;
	component?: Component<NodeProps<T>, {}, ''>;
	nodeView?: (editor: Editor) => NodeViewConstructor;

	// component?: Component;
}

// Props extends Record<string, any> = {},
// 		Exports extends Record<string, any> = {},
// 		Bindings extends keyof Props | '' = string

export interface PMExtension {
	nodes: { [name: string]: NodeSpec };
}
