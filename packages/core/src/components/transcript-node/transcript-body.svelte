<script lang="ts" module>
	import type { Node as PMNode, NodeSpec } from 'prosemirror-model';

	export const transcriptBodySchema: NodeSpec = {
		content: 'inline*',
		group: 'block',
		isolating: true,
		selectable: false
	};

	export const transcriptSchema: NodeSpec = {
		content: 'transcriptBody',
		group: 'block',
		selectable: false,
		isolating: true
	};

	export let attrs: any;
</script>

<script lang="ts">
</script>
