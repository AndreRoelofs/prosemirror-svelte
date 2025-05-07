<script lang="ts" module>
	import type { Node as PMNode, NodeSpec } from 'prosemirror-model';

	export interface FigureAttrs {
		id: string | undefined;
	}

	export const figureAttrs: FigureAttrs = {
		id: undefined
	};

	export const figureSchema: NodeSpec = {
		attrs: Object.entries(figureAttrs).reduce(
			(acc, [key, value]) => ({ ...acc, [key]: { default: value } }),
			{}
		),
		content: 'image figcaption',
		selectable: false,
		group: 'block'
	};
</script>

<script lang="ts">
	import type { NodeProps } from '@prosemirror-svelte/core';

	interface Props extends NodeProps<FigureAttrs> {}

	const { node, attrs, contentDOM }: Props = $props();
</script>

<figure id={attrs.id} data-hole />

<style lang="postcss">
	figure {
		align-items: center;
		display: flex;
		flex-direction: column;
	}
</style>
