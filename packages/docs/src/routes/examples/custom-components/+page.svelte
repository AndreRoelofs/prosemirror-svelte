<script lang="ts">
	import { Editor as ProsemirrorEditor } from '@prosemirror-svelte/core';
	import type { Query } from '@prosemirror-svelte/core';
	import { equationExtension } from '@my-org/ext-equation';
	import { paragraphExtension } from '@my-org/ext-paragraph';
	import { blockquoteExtension } from '@my-org/ext-blockquote';
	import { transcriptExtension } from '@my-org/ext-transcript';

	let editorRef: ProsemirrorEditor | null = $state(null);

	const exampleInput: Query = {
		text: 'Where in ',
		extensions: [equationExtension(), transcriptExtension()]
	};

	// const exampleInput =
	// 	'Where in <transcript text="Some Transcript"/> is the following topic discussed <google-drive title="Some file"/>';

	function clear() {
		console.log(editorRef);
		// editorRef?.clear();
	}

	function focus() {
		// editorRef?.focus();
	}

	function addTranscriptNode() {
		// TODO: implement
		editorRef?.addTranscriptNode();
	}

	function addEquationNode() {
		if (!editorRef?.view) return;
		const state = editorRef.view.state;
		const tr = state.tr;
		const { schema } = state;
		const nodes = schema.nodes;
		tr.insert(
			1,
			nodes.equation.create(
				{
					latex: 'a^2 = \\sqrt{b^2 + c^2}'
				},
				schema.text('Mah equation')
			)
		);
		// Try both approaches to ensure they both work
		// Approach 1: Using attrs

		// Approach 2: Using content
		// tr.insert(
		// 	9,
		// 	nodes.transcript.create(
		// 		{ id: 'transcript-2' },
		// 		schema.text('Youtube transcript with content')
		// 	)
		// );
		editorRef?.view.dispatch(tr);
	}
</script>

<ProsemirrorEditor bind:this={editorRef} query={exampleInput} />

<div class="controls">
	<button onclick={clear}>Clear</button>
	<button>Reset</button>
	<button>Select all</button>
	<button onclick={focus}>Focus</button>
	<button onclick={addTranscriptNode}>Add transcript</button>
	<button onclick={addEquationNode}>Add equation</button>
</div>

<!-- <div class="mirror">Current plain text content of the editor: "{textContent}"</div> -->
