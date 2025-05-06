<script lang="ts" context="module">
	import type { Node as PMNode, NodeSpec } from 'prosemirror-model';

	export interface ImageAttrs {
		title: string;
		src: string;
		alt: string;
	}

	export const imageAttrs: ImageAttrs = {
		title: '',
		src: '',
		alt: ''
	};

	export const imageSchema: NodeSpec = {
		attrs: Object.entries(imageAttrs).reduce(
			(acc, [key, value]) => ({ ...acc, [key]: { default: value } }),
			{}
		),
		selectable: true,
		// inline: true,
		// group: 'inline',
		draggable: true
	};
</script>

<script lang="ts">
	import type { NodeProps } from '@prosemirror-svelte/old-core';

	interface $$Props extends NodeProps<ImageAttrs> {}

	const { node, attrs, contentDOM } = $props<{
		node: PMNode | undefined;
		attrs: ImageAttrs;
		contentDOM: (node: HTMLElement) => void;
	}>();
</script>

<img src={attrs.src} alt={attrs.alt} title={attrs.title} />

<style lang="postcss">
	:global(img.ProseMirror-selectednode) {
		outline: 2px solid #8cf;
	}
</style>
