<script lang="ts">
	import { onMount } from 'svelte';
	import {
		ProsemirrorEditor,
		createMultiLineEditor,
		toPlainText,
		clear,
		selectAll
	} from '@prosemirror-svelte/bindings';

	const getEditorState = () => createMultiLineEditor('Go ahead. Edit me!');

	let editor, focusEditor;
	let editorState = getEditorState();

	const handleChange = (event) => {
		editorState = event.detail.editorState;
	};

	const clearEditor = (event) => {
		editorState = clear(editorState);
		focusEditor();
	};

	const resetEditor = (event) => {
		editorState = getEditorState();
		focusEditor();
	};

	const selectAllText = (event) => {
		editorState = selectAll(editorState);
		focusEditor();
	};

	$: textContent = editorState ? toPlainText(editorState) : '';

	onMount(() => focusEditor());
</script>

<ProsemirrorEditor
	{editorState}
	bind:editor
	bind:focus={focusEditor}
	on:change={handleChange}
	placeholder="Text goes here"
	debounceChangeEventsInterval={0}
/>

<div class="controls">
	<button on:click={clearEditor}>Clear</button>
	<button on:click={resetEditor}>Reset</button>
	<button on:click={selectAllText}>Select all</button>
	<button on:click={focusEditor}>Focus</button>
</div>

<div class="mirror">Current plain text content of the editor: "{textContent}"</div>
