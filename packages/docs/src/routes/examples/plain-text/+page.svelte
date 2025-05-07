<script lang="ts">
	import { onMount } from 'svelte';
	import { ProsemirrorEditor } from '@prosemirror-svelte/core';

	let editorRef: any | null = $state(null);

	function clear() {
		console.log(editorRef);
		editorRef?.clear();
	}

	function focus() {
		editorRef?.focus();
	}
</script>

<ProsemirrorEditor
	bind:this={editorRef}
	placeholder="Text goes here"
	textContent="Go ahead. Edit me!"
/>

<div class="controls">
	<button onclick={clear}>Clear</button>
	<button>Reset</button>
	<button>Select all</button>
	<button onclick={focus}>Focus</button>
	<button>Blur</button>
</div>

<!-- <div class="mirror">Current plain text content of the editor: "{textContent}"</div> -->

<style>
</style>
