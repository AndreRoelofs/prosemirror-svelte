<script lang="ts">
	import { onMount } from 'svelte';
	import type { EditorState } from 'prosemirror-state';
	import {
		ProsemirrorEditor,
		createRichTextEditor,
		clear,
		insertImage
	} from '@prosemirror-svelte/bindings';

	const html = '<h3>Welcome to Prosemirror Svelte</h3><p>Feel free to <b>edit me</b>!</p>';

	let src =
		'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60';

	let focusEditor: (() => void) | undefined = $state();
	let editorState = $state<EditorState>();

	const plugins = [];

	const handleChange = ({ editorState: newState }: { editorState: EditorState }) => {
		editorState = newState;
	};

	function clearEditor(event: MouseEvent) {
		if (!editorState) return;
		editorState = clear(editorState);
		focusEditor?.();
	}

	function resetEditor(event: MouseEvent) {
		if (!editorState) return;
		editorState = createRichTextEditor(html);
		focusEditor?.();
	}

	function handleInsertImage(event: MouseEvent) {
		if (!editorState) return;
		editorState = insertImage(editorState, { src });
	}

	function preventDefault(event: MouseEvent) {
		event.preventDefault();
	}

	onMount(() => {
		editorState = createRichTextEditor(html);
		focusEditor?.();
	});
</script>

<ProsemirrorEditor
	{editorState}
	focus={focusEditor}
	change={handleChange}
	placeholder="Go ahead and edit me!"
	transaction={null}
	custom={null}
	blur={focusEditor}
/>

<div class="controls" style="display: flex">
	<button onclick={clearEditor}>Clear</button>
	<button onclick={resetEditor}>Reset</button>

	<input type="text" bind:value={src} style="flex: 1" />

	<button style="margin-left: .5em" onclick={handleInsertImage} onmousedown={preventDefault}>
		Insert image
	</button>
</div>

<style>
	button,
	input {
		margin: 0.5em;
	}

	input {
		outline: none;
	}

	:global(.ui-editor img) {
		max-width: 300px;
	}
</style>
