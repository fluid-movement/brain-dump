<script lang="ts">
	import '../app.css';
	import { Separator } from '$lib/components/ui/separator';

	let { children } = $props();
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
	<h1 class="text-3xl font-bold mb-4">Brain Dump</h1>

	<Separator class="mb-6" />

	{@render children()}
</div>
