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
		atom: true,
		inline: true,
		defining: true,

		parseDOM: [
			{
				tag: 'span.transcript', // Changed from figure
				getAttrs: (dom: HTMLElement | string) => {
					if (dom instanceof HTMLElement) {
						return {
							id: dom.getAttribute('id'),
							text: dom.getAttribute('text')
						};
					}
					return null;
				}
			}
		],
		toDOM(node: PMNode) {
			console.log('to dom');
			const { id, text } = node.attrs;
			return ['span', { id, class: 'transcript', attrs: { text } }, ['text', text]]; // Changed from figure and pre
		}
	};
</script>

<script lang="ts">
	// export interface Props extends NodeProps<TranscriptAttrs> {
	// 	ref: HTMLElement;
	// }

	let { ref, attrs }: NodeProps<TranscriptAttrs> = $props();

	export { ref, attrs };

	$effect(() => {
		console.log(ref);
		console.log(attrs.text);
	});
</script>

<span class="transcript" bind:this={ref} data-hole {...attrs}>
	{attrs.text || ''}
</span>

<style lang="postcss">
	.transcript {
		width: fit-content;
		background-color: red;
		padding: 5px;
	}
</style>
