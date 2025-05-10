<script lang="ts" module>
	import type { NodeSpec } from 'prosemirror-model';
	import { Node as PMNode } from 'prosemirror-model';
	import type { NodeProps } from '../../typings/extension.js';
	export interface TranscriptAttrs {
		id?: string;
		text?: string;
	}

	export const transcriptAttrs: TranscriptAttrs = {
		id: undefined,
		text: undefined
	};

	export const transcriptSchema: NodeSpec = {
		attrs: Object.entries(transcriptAttrs).reduce(
			(acc, [key, value]) => ({ ...acc, [key]: { default: value } }),
			{}
		),
		content: 'inline+',
		group: 'inline',
		inline: true,

		parseDOM: [
			{
				tag: 'figure.transcript', // Changed from figure
				getAttrs: (dom: HTMLElement | string) => {
					if (dom instanceof HTMLElement) {
						return {
							id: dom.getAttribute('id'),
							text: dom.getAttribute('data-text')
						};
					}
					return null;
				}
			}
		],
		toDOM(node: PMNode) {
			const { id, text } = node.attrs;
			return ['figure', { id, class: 'transcript', pre: text }, ['text', text]];
		}
	};
</script>

<script lang="ts">
	import type { SvelteNodeViewProps } from '../../SvelteNodeView.js';
	import { onMount } from 'svelte';
	export interface Props extends SvelteNodeViewProps<TranscriptAttrs> {
		ref: HTMLElement;
		attrs: TranscriptAttrs;
	}

	let { ref, attrs }: Props = $props();

	export { ref, attrs };

	onMount(() => {
		console.log(ref);
		console.log(attrs.text);
	});

	function handleClick(event: MouseEvent) {
		console.log('click');
		event.preventDefault();
	}

	function handleKeyDown(event: KeyboardEvent) {
		console.log('keydown');
		event.preventDefault();
	}
</script>

<figure
	role="button"
	class="transcript"
	onclick={handleClick}
	bind:this={ref}
	data-hole
	{...attrs}
	onkeydown={handleKeyDown}
>
	<div
		class="equation"
		role="button"
		tabindex="-1"
		data-text={attrs.text}
		onclick={handleClick}
		onkeydown={handleKeyDown}
	>
		{attrs.text}
	</div>
</figure>

<style lang="postcss">
	:global(.transcript) {
		width: fit-content;
		background-color: red;
		padding: 5px;
		display: inline-block;
	}
</style>
