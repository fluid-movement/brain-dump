<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		onclick?: () => void;
		active?: boolean;
		class?: string;
	};

	let { children, onclick, active = false, class: classProp }: Props = $props();

	let activeClass = $derived(
		onclick
			? active
				? 'bg-primary text-primary-foreground hover:bg-primary/80'
				: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
			: 'bg-secondary'
	);

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			if (onclick) onclick();
		}
	}
</script>

<div
	role="button"
	tabindex="0"
	{onclick}
	onkeydown={onKeyDown}
	class={cn('cursor-pointer p-2 border rounded', classProp, activeClass)}
>
	{@render children()}
</div>
