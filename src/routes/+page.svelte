<script lang="ts">
	import { appStore } from '$lib/store';
	import { onMount } from 'svelte';
	import Thoughts from '$lib/components/Thoughts.svelte';
	import Tags from '$lib/components/Tags.svelte';

	let appState = $derived($appStore);

	onMount(() => {
		appStore.init();
	});
</script>

<main class="flex gap-4">
	<section>
		<Tags {appState} />
	</section>
	<section class="flex-2/3">
		<Thoughts {appState} />
	</section>
</main>
