<script lang="ts" module>
	import type { NodeSpec } from 'prosemirror-model';
	import { Node as PMNode } from 'prosemirror-model';

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
		content: 'inline*',
		group: 'block',
		atom: true,
		parseDOM: [
			{
				tag: 'figure.transcript',
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
			const { id, text } = node.attrs;
			return ['figure', { id, class: 'transcript', text }, ['pre', text]];
		}
	};
</script>

<script lang="ts">
	export interface Props {
		attrs: TranscriptAttrs;
		ref: HTMLElement;
	}

	let { ref, attrs }: Props = $props();

	export { ref };
</script>

<figure class="transcript" bind:this={ref} data-hole {...attrs}></figure>
