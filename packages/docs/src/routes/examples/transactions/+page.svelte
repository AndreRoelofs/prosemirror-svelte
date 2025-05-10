<!-- <script lang="ts">
	import { onMount } from 'svelte';
	import type { EditorState } from 'prosemirror-state';

	import {
		ProsemirrorEditor,
		createRichTextEditor,
		toJSON,
		clear,
		toggleMark,
		setBlockType,
		getCurrentMarks,
		getNodeTypeAtSelectionHead
	} from '@prosemirror-svelte/bindings';

	const html = '<h3>Welcome to Prosemirror Svelte</h3><p>Feel free to <b>edit me</b>!</p>';

	onMount(() => {
		editorState = createRichTextEditor(html);
	});

	let focusEditor: (() => void) | undefined = $state();
	let showEditorState = $state(true);
	let editorState = $state();

	const plugins = [];

	function handleTransaction(event: { detail: { editorState: EditorState } }) {
		editorState = event.detail.editorState;
	}

	function clearEditor(event: MouseEvent) {
		editorState = clear(editorState);
		focusEditor?.();
	}

	function resetEditor(event: MouseEvent) {
		editorState = createRichTextEditor(html);
		focusEditor?.();
	}

	function handleToggleBold(event: MouseEvent) {
		editorState = toggleMark(editorState, 'strong');
	}

	function handleSetBlockType(type: string, attrs: object = {}) {
		return function (event: MouseEvent) {
			editorState = setBlockType(editorState, type, attrs);
		};
	}

	function preventDefault(event: MouseEvent) {
		event.preventDefault();
	}

	function getBlockType(node: any) {
		if (!node || !node.type) return null;

		if (node.attrs && typeof node.attrs.level !== 'undefined' && node.attrs.level !== null) {
			return `${node.type.name}-${node.attrs.level}`;
		} else {
			return node.type.name;
		}
	}

	const currentMarks = $derived(editorState ? getCurrentMarks(editorState) : null);
	const activeMarks = $derived(currentMarks ? Object.keys(currentMarks.activeMarks) : []);
	const nodeAtSelectionHead = $derived(editorState ? getNodeTypeAtSelectionHead(editorState) : {});
	const activeBlockType = $derived(getBlockType(nodeAtSelectionHead));
	const isBold = $derived(
		currentMarks && currentMarks.activeMarks && currentMarks.activeMarks.strong
	);

	$effect(() => {
		// Replace onMount with $effect
		focusEditor?.();
	});
</script>

<ProsemirrorEditor
	{editorState}
	focus={focusEditor}
	transaction={handleTransaction}
	placeholder="Go ahead and edit me!"
	change={null}
	custom={null}
	blur={null}
/>

<div class="controls">
	<button onclick={clearEditor}>Clear</button>
	<button onclick={resetEditor}>Reset</button>

	<button style="margin-left: .5em" onclick={handleToggleBold} onmousedown={preventDefault}>
		{#if isBold}Too bold for me{:else}Make it bold{/if}
	</button>

	<button
		style="margin-left: .5em"
		disabled={activeBlockType === 'paragraph'}
		onclick={handleSetBlockType('paragraph')}
		onmousedown={preventDefault}>p</button
	>

	<button
		disabled={activeBlockType === 'heading-1'}
		onclick={handleSetBlockType('heading', { level: 1 })}
		onmousedown={preventDefault}>h1</button
	>

	<button
		disabled={activeBlockType === 'heading-2'}
		onclick={handleSetBlockType('heading', { level: 2 })}
		onmousedown={preventDefault}>h2</button
	>

	<button
		disabled={activeBlockType === 'heading-3'}
		onclick={handleSetBlockType('heading', { level: 3 })}
		onmousedown={preventDefault}>h3</button
	>
</div>

<div class="controls">
	Additional information about the current editor instance:

	<ul>
		<li>
			<b>Active marks: </b>{activeMarks && activeMarks.length ? activeMarks.toString() : 'none'}
		</li>

		<li>
			<b>Type of node at selection head:</b>
			{activeBlockType}
		</li>
	</ul>

	<p>
		<label>
			Show serialized editor state
			<input type="checkbox" bind:checked={showEditorState} />
		</label>
	</p>
</div>

{#if showEditorState}
	<pre>{JSON.stringify(toJSON(editorState), null, 2)}</pre>
{/if} -->
