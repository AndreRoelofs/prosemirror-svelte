<script lang="ts">
	import { onMount } from 'svelte';
	import type { EditorState } from 'prosemirror-state';
	import {
		ProsemirrorEditor,
		createMultiLineEditor,
		toPlainText,
		clear,
		selectAll
	} from '@prosemirror-svelte/bindings';
	import type { EditorView } from 'prosemirror-view';

	const getEditorState = () => createMultiLineEditor('Go ahead. Edit me!');

	// Reference to the editor element
	let editorRef: any = $state();
	// Editor state
	let editorState = $state(getEditorState());
	// Reference to the focus and blur functions
	let focusEditor: (() => void) | undefined = $state();
	let blurEditor: (() => void) | undefined = $state();

	// Handle editor state changes
	function handleChange(event: any) {
		editorState = event.detail.editorState;
		console.log(editorState);
	}

	// Clear the editor content
	function clearEditor() {
		editorState = clear(editorState);
		focusEditor?.();
	}

	// Reset the editor to its initial state
	function resetEditor() {
		editorState = getEditorState();
		focusEditor?.();
	}

	// Select all text in the editor
	function selectAllText() {
		editorState = selectAll(editorState);
		focusEditor?.();
	}

	// Computed value for the plain text content
	let textContent = $derived(editorState ? toPlainText(editorState) : '');

	// Focus the editor when the component is mounted
	onMount(() => {
		if (focusEditor) focusEditor();
	});
</script>

<ProsemirrorEditor
	{editorState}
	editor={editorRef}
	change={handleChange}
	transaction={null}
	custom={null}
	focus={function () {
		focusEditor = this.focus;
	}}
	blur={function () {
		blurEditor = this.blur;
	}}
	placeholder="Text goes here"
	debounceChangeEventsInterval={0}
/>

<div class="controls">
	<button onclick={clearEditor}>Clear</button>
	<button onclick={resetEditor}>Reset</button>
	<button onclick={selectAllText}>Select all</button>
	<button onclick={() => focusEditor?.()}>Focus</button>
	<button onclick={() => blurEditor?.()}>Blur</button>
</div>

<div class="mirror">Current plain text content of the editor: "{textContent}"</div>
