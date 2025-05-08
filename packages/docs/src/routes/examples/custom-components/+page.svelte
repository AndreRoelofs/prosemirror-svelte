<script lang="ts">
	import { figureExtension } from '$lib/components/figure/index.js';

	import { Editor as ProsemirrorEditor } from '@prosemirror-svelte/core';
	import type { Query } from '@prosemirror-svelte/core';

	let editorRef: any | null = $state(null);

	const exampleInput: Query = {
		text: 'Where in '
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

<ProsemirrorEditor bind:this={editorRef} query={exampleInput} />

<div class="controls">
	<button onclick={clear}>Clear</button>
	<button>Reset</button>
	<button>Select all</button>
	<button onclick={focus}>Focus</button>
	<button onclick={addTranscriptNode}>Add transcript</button>
</div>

<!-- <div class="mirror">Current plain text content of the editor: "{textContent}"</div> -->
