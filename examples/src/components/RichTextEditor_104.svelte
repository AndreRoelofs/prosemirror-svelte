<script>
	import { onMount } from 'svelte';
	import { Plugin, PluginKey } from 'prosemirror-state';

	import ProsemirrorEditor from '../../../ProsemirrorEditor.svelte';
	import { createRichTextEditor, clear } from '../../../state';

	const html = '<p>Paste something</p>';

	let focusEditor = $state();
	let showEditorState = $state(false);
	let pasteData = $state(null);
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

	let editorState = $state(createRichTextEditor(html, plugins));

	function handleChange(event) {
		editorState = event.detail.editorState;
	}

	function clearEditor(event) {
		editorState = clear(editorState);
		pasteData = null;
		numberOfPastes = 0;
		focusEditor();
	}

	function resetEditor(event) {
		editorState = createRichTextEditor(html, plugins);
		pasteData = null;
		numberOfPastes = 0;
		focusEditor();
	}

	onMount(() => focusEditor());
</script>

<ProsemirrorEditor
	{editorState}
	bind:focus={focusEditor}
	change={handleChange}
	placeholder="Go ahead and edit me!"
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
</style>
