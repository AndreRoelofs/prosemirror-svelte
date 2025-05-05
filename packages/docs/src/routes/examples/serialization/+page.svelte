<script lang="ts">
	import { onMount } from 'svelte';
	import type { EditorState } from 'prosemirror-state';
	import {
		ProsemirrorEditor,
		createRichTextEditor,
		fromJSON,
		toJSON,
		clear,
		richTextSchema,
		richTextPlugins
	} from '@prosemirror-svelte/bindings';

	const html = '<h3>Welcome to Prosemirror Svelte</h3><p>Feel free to <b>edit me</b>!</p>';

	let focusEditor: (() => void) | undefined = $state();

	let showEditorState = $state(false);
	let editorState = $state<EditorState>();

	const plugins = [];

	const handleChange = ({ editorState: newState }: { editorState: EditorState }) => {
		editorState = newState;
	};

	function clearEditor(event: MouseEvent) {
		editorState = clear(editorState);
		focusEditor?.();
	}

	function resetEditor(event: MouseEvent) {
		editorState = createRichTextEditor(html);
		focusEditor?.();
	}

	function handleSave() {
		if (!editorState) return;
		try {
			localStorage.setItem('editor', JSON.stringify(toJSON(editorState)));
			console.log('Saved!');
		} catch (err) {
			console.error('Error saving your state:', err);
		}
	}

	function handleLoad() {
		if (!editorState) return;
		const state = localStorage.getItem('editor');

		if (!state) {
			console.error('Nothing saved so far');
			return;
		}

		try {
			editorState = fromJSON(JSON.parse(state), richTextSchema, richTextPlugins);
			focusEditor?.();
		} catch (err) {
			console.error('Error loading your state:', err);
		}
	}

	onMount(() => {
		editorState = createRichTextEditor(html);
		focusEditor?.();
	});
</script>

<ProsemirrorEditor
	{editorState}
	focus={focusEditor}
	placeholder="Go ahead and edit me!"
	transaction={null}
	custom={null}
	change={handleChange}
	blur={focusEditor}
/>

<div class="controls">
	<button onclick={clearEditor}>Clear</button>
	<button onclick={resetEditor}>Reset</button>
	<button onclick={handleSave}>Save to local storage</button>
	<button onclick={handleLoad}>Load from local storage</button>
</div>
