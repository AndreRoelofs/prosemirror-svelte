<!-- <script lang="ts">
	import { onMount } from 'svelte';
	import { Plugin, PluginKey } from 'prosemirror-state';

	import type { EditorState } from 'prosemirror-state';

	import { ProsemirrorEditor, createRichTextEditor, clear } from '@prosemirror-svelte/bindings';

	const html = '<p>Paste something</p>';

	let focusEditor: (() => void) | undefined = $state();
	let pasteData = $state<string | null>(null);
	let numberOfPastes = $state(0);

	const pasty = new PluginKey('pasty');

	const handlePaste = new Plugin({
		key: pasty,
		props: {
			handlePaste: function (view, event, slice) {
				pasteData = JSON.stringify(slice, null, 2);
				numberOfPastes += 1;
				return false;
			}
		}
	});

	const plugins = [handlePaste];

	let editorState = $state<EditorState>();

	const handleChange = ({ editorState: newState }: { editorState: EditorState }) => {
		editorState = newState;
	};

	function clearEditor(event: MouseEvent) {
		editorState = clear(editorState);
		pasteData = null;
		numberOfPastes = 0;
		focusEditor?.();
	}

	function resetEditor(event: MouseEvent) {
		editorState = createRichTextEditor(html, plugins);
		pasteData = null;
		numberOfPastes = 0;
		focusEditor?.();
	}

	onMount(() => {
		editorState = createRichTextEditor(html, plugins);
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

<div class="controls">
	<button onclick={clearEditor}>Clear</button>
	<button onclick={resetEditor}>Reset</button>
</div>

<h2>Last paste event:</h2>
<pre>
    {pasteData || 'Nothing pasted yet'}
</pre>

<p>Total pastes: {numberOfPastes}</p>

<style>
	pre {
		padding: 0.5em;
	}
</style> -->
