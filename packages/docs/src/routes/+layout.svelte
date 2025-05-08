<script lang="ts">
	import '../app.pcss';
	let { children } = $props();

	function navigate(url: string) {
		window.location.href = url;
	}
</script>

<div class="menu">
	<button onclick={() => navigate('/')}> Home </button>
	<button onclick={() => navigate('/examples/plain-text')}> Plain Text </button>
	<button onclick={() => navigate('/examples/rich-text')}> Rich Text </button>
	<button onclick={() => navigate('/examples/serialization')}> Serialization </button>
	<button onclick={() => navigate('/examples/images')}> Images </button>
	<button onclick={() => navigate('/examples/transactions')}> Transactions </button>
	<button onclick={() => navigate('/examples/plugins')}> Plugins </button>
	<button onclick={() => navigate('/examples/custom-components')}> Custom Components </button>
</div>

{@render children?.()}
