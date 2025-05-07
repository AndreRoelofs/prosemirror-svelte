<script lang="ts" module>
	import type { Node as PMNode, NodeSpec } from 'prosemirror-model';

	export interface TranscriptAttrs {
		id: string;
	}

	export const transcriptAttrs: TranscriptAttrs = {
		id: 'a5a1f770-8e6a-4d87-88d2-ba06dff789c8'
	};

	export const transcriptSchema: NodeSpec = {
		attrs: Object.entries(transcriptAttrs).reduce(
			(acc, [key, value]) => ({ ...acc, [key]: { default: value } }),
			{}
		),
		content: 'transcriptBody',
		group: 'block',
		selectable: false,
		isolating: true
	};
</script>

<script lang="ts">
	import type { NodeProps } from '../../typings';

	export interface Props extends NodeProps<TranscriptAttrs> {}

	const { node, attrs, contentDOM }: Props = $props();
</script>

<figure data-hole id={attrs.id}>Test Transcript</figure>
