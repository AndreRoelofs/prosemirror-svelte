<script lang="ts">
	import { EditorState } from 'prosemirror-state';
	import { DOMParser } from 'prosemirror-model';
	import { EditorView } from 'prosemirror-view';
	import { onDestroy, onMount } from 'svelte';
	import type { Query } from './typings/index.js';
	import { createExtensions } from './createExtensions.js';
	import { paragraphExtension } from './components/paragraph/extension.js';
	import './Editor.css';

	export interface Props {
		query: Query;
		placeholder?: string;
	}

	let editorRef: HTMLDivElement | null = $state(null);
	let view: EditorView | null = null;

	export { view };

	let { query, placeholder }: Props = $props();

	onMount(() => {
		init();
	});

	export async function init(query?: Query) {
		const doc = document.createElement('p');
		doc.textContent = query?.text ?? '';

		query.extensions.unshift(paragraphExtension());

		// @ts-ignore
		const created = await createExtensions(this as any, query.extensions);

		view = new EditorView(editorRef, {
			state: EditorState.create({
				schema: created.schema,
				plugins: [...created.plugins],
				doc: DOMParser.fromSchema(created.schema).parse(doc)
			}),
			nodeViews: created.nodeViews,
			markViews: created.markViews
		});
	}

	export function testExport() {
		console.log('testExport');
	}

	export function addTranscriptNode() {
		if (!view) return;
		const state = view.state;
		const tr = state.tr;
		const { schema } = state;
		const nodes = schema.nodes;
		// Try both approaches to ensure they both work
		// Approach 1: Using attrs
		tr.insert(
			9,
			nodes.transcript.createChecked(
				{
					id: 'transcript-1',
					text: 'Some transcript with attrs'
				},
				schema.text('transcript')
			)
		);

		// Approach 2: Using content
		// tr.insert(
		// 	9,
		// 	nodes.transcript.create(
		// 		{ id: 'transcript-2' },
		// 		schema.text('Youtube transcript with content')
		// 	)
		// );
		view.dispatch && view.dispatch(tr);
	}

	export function sendQuery(query: Query) {
		init(query);
	}

	export function cmd() {}

	onDestroy(() => {
		view?.destroy();
	});
</script>

<div contenteditable class:ProseMirror={true} bind:this={editorRef}></div>

<style lang="postcss">
	.ProseMirror {
		border-top: 0;
		min-height: 300px;
		overflow-wrap: break-word;
		outline: none;
		white-space: pre-wrap;
		width: 100%;
		@apply p-4;
	}
</style>
