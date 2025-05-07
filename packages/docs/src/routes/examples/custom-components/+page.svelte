<script lang="ts">
	import { figureExtension } from '$lib/components/figure/index.js';
	import { ProsemirrorEditor, transcriptExtension } from '@prosemirror-svelte/core';

	import type { Query, EurNode } from '@prosemirror-svelte/core';

	let editorRef: any | null = $state(null);

	const exampleInput: Query = {
		text: 'Where in ',
		eurNodes: [
			{
				id: 'a5a1f770-8e6a-4d87-88d2-ba06dff789c8',
				position: 8,
				attrs: {
					text: 'Some Transcript'
				}
			}
		]
	};

	// const exampleInput =
	// 	'Where in <transcript text="Some Transcript"/> is the following topic discussed <google-drive title="Some file"/>';

	function clear() {
		console.log(editorRef);
		editorRef?.clear();
	}

	function focus() {
		editorRef?.focus();
	}

	function addTranscriptNode() {
		// TODO: implement
	}
</script>

<ProsemirrorEditor
	bind:this={editorRef}
	query={exampleInput}
	placeholder=""
	extensions={[figureExtension]}
/>

<div class="controls">
	<button onclick={clear}>Clear</button>
	<button>Reset</button>
	<button>Select all</button>
	<button onclick={focus}>Focus</button>
	<button onclick={addTranscriptNode}>Add transcript</button>
</div>

<!-- <div class="mirror">Current plain text content of the editor: "{textContent}"</div> -->

<style>
</style>
