<script lang="ts">
	import { onMount } from 'svelte';
	import type { EditorState } from 'prosemirror-state';
	import {
		ProsemirrorEditor,
		createRichTextEditor,
		toPlainText,
		clear,
		toHTML
	} from '@prosemirror-svelte/bindings';

	const html = `
<h3>I am Rich</h3>
<p>Hello there! I am Rich, a rich-text editor. </p>
<p>Go ahead and edit me.</p>
<p>You can change the format using the keyboard. E.g.: </p>
<p><strong>Ctrl/Cmd-b</strong> will toggle text as <strong>bold</strong>.</p>
<p><strong>Ctrl/Cmd-i</strong> will toggle text as <em>italic</em>.</p>
<p><b>Ctrl-Shift-0</b> will set the block type to paragraph.</p>
<p><b>Ctrl-Shift-1,2,3...</b> will set the block type to heading 1,2,3...</p>`;

	let focusEditor: (() => void) | undefined = $state();

	let editorState = $state();

	const handleChange = ({ editorState: newState }: { editorState: EditorState }) => {
		editorState = newState;
	};
	function clearEditor() {
		editorState = clear(editorState);
		focusEditor?.();
	}

	function resetEditor() {
		editorState = createRichTextEditor(html);
		focusEditor?.();
	}

	function showHtml() {
		alert(toHTML(editorState));
	}

	function showText() {
		alert(toPlainText(editorState));
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
	blur={null}
/>

<div class="controls">
	<button onclick={clearEditor}>Clear</button>
	<button onclick={resetEditor}>Reset</button>
	<button onclick={showHtml}>Show HTML</button>
	<button onclick={showText}>Show Text</button>
</div>
