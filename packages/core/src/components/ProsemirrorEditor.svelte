<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { EditorState, TextSelection, AllSelection } from 'prosemirror-state';
	import { EditorView } from 'prosemirror-view';
	import { schema } from 'prosemirror-schema-basic';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';
	import { corePlugins, richTextPlugins } from '../helpers/index.js';
	import type { Query } from '../typings/index.js';
	import { DOMParser } from 'prosemirror-model';
	interface Props extends HTMLAttributes<HTMLDivElement> {
		ref?: HTMLDivElement | null;
		class?: ClassValue;
		query?: Query;
		placeholder?: string;
		extensions?: any[];
	}

	let {
		ref = $bindable(null),
		class: className,
		query,
		placeholder = 'Default placeholder',
		extensions = [],
		...restProps
	}: Props = $props();

	const registeredBadges = $state([]);

	let view: EditorView | null = null;
	let textContent = $state(query?.text || '');

	onMount(() => {
		view = new EditorView(
			// ref!,
			// {
			// 	mount: ref!
			// },
			null,
			{
				state: EditorState.create({
					schema,
					plugins: [...corePlugins, ...richTextPlugins],
					// doc: query?.text ? schema.nodeFromJSON({ content: query.text }) : undefined
					// doc: schema.nodeFromJSON({ content: query?.text || '' })
					doc: DOMParser.fromSchema(schema).parse(ref!)
				})
			}
		);
		console.log(view?.state.doc.toJSON());
	});

	onDestroy(() => {
		view?.destroy();
	});

	/**
	 * Clears the document to a single empty paragraph, then focuses the editor
	 * This function is exposed to parent components via `bind:this`.
	 */
	export function clear() {
		if (!view) return;
		const state = view.state;
		const selection = new AllSelection(state.doc);
		const transaction = state.tr;
		transaction.setSelection(selection);
		transaction.deleteSelection().scrollIntoView();
		view.updateState(state.apply(transaction));

		// const tr = state.tr;
		// tr.replaceWith(0, state.doc.content.size, schema.node('paragraph'));
		// view.dispatch(tr);
		// view.focus();
	}

	/**
	 * Programmatically focus the editor - exposed to parents.
	 */
	export function focus() {
		view?.focus();
	}

	$effect(() => {
		console.log('query changed', query);
		// TODO: render the badges
	});
</script>

<!-- The actual DOM node ProseMirror will manage -->
<div
	bind:this={ref}
	bind:textContent
	contenteditable
	class:ProseMirror={true}
	class="editor_empty ui-editor"
	data-placeholder={placeholder}
	{...restProps}
></div>

<style>
	.ProseMirror {
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 0.75rem;
		min-height: 150px;
		font-family: ui-sans-serif, system-ui, sans-serif;
	}

	:global(.ProseMirror) {
		position: relative;
	}

	:global(.ProseMirror) {
		word-wrap: break-word;
		white-space: pre-wrap;
		-webkit-font-variant-ligatures: none;
		font-variant-ligatures: none;
	}

	:global(.ProseMirror) pre {
		white-space: pre-wrap;
	}

	:global(.ProseMirror) li {
		position: relative;
	}

	:global(.ProseMirror-hideselection *::selection) {
		background: transparent;
	}

	:global(.ProseMirror-hideselection *::-moz-selection) {
		background: transparent;
	}

	:global(.ProseMirror-hideselection) {
		caret-color: transparent;
	}

	:global(.ProseMirror-selectednode) {
		outline: 2px solid #8cf;
	}

	/* Make sure li selections wrap around markers */

	:global(li.ProseMirror-selectednode) {
		outline: none;
	}

	:global(li.ProseMirror-selectednode:after) {
		content: '';
		position: absolute;
		left: -32px;
		right: -2px;
		top: -2px;
		bottom: -2px;
		border: 2px solid #8cf;
		pointer-events: none;
	}

	:global(.ProseMirror .empty-node::before) {
		position: absolute;
		color: #aaa;
		cursor: text;
	}

	:global(.ProseMirror .empty-node:hover::before) {
		color: #777;
	}

	:global(.ProseMirror.editor_empty::before) {
		position: absolute;
		content: attr(data-placeholder);
		pointer-events: none;
		color: rgba(0, 0, 0, 0.5);
	}
</style>
