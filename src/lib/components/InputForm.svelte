<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Plus } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';

	interface Props {
		value: string;
		placeholder: string;
		onSubmit: (event: SubmitEvent) => void;
		onKeyDown?: (event: KeyboardEvent) => void;
		classProp?: string;
	}

	let { value = $bindable(), placeholder, onSubmit, onKeyDown, classProp = '' }: Props = $props();
</script>

<form onsubmit={onSubmit}>
	<div class={cn('flex items-center gap-2', classProp)}>
		<Input {placeholder} bind:value onkeydown={onKeyDown} />
		<Button size="icon" type="submit" class="mr-2">
			<Plus />
		</Button>
	</div>
</form>
