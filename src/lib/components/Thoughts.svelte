<script lang="ts">
	import { appStore } from '$lib/store';
	import { addNewThought, removeThoughtFromState, setActiveThoughtInState } from '$lib/actions/appStateActions';
	import type { AppState, Thought } from '$lib/types';
	import { Button } from '$lib/components/ui/button';
	import { Trash } from '@lucide/svelte';
	import InputForm from '$lib/components/InputForm.svelte';
	import HoverCard from '$lib/components/HoverCard.svelte';

	interface Props {
		appState: AppState;
	}

	let { appState }: Props = $props();
	let thoughts = $derived(appState.thoughts);
	let value = $state('');

	function onThoughtKeyPress(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			value = '';
		}
	}

	function addThought(event: Event) {
		event.preventDefault();
		if (value.trim() !== '') {
			appStore.updateState(state => addNewThought(state, value));
			value = '';
			const latestThought = appState.thoughts.at(0);
			if(typeof latestThought?.id === "string") {
				appStore.updateState(state => setActiveThoughtInState(state, latestThought.id))
			}
		}
	}

	function deleteThought(thoughtId: string) {
		appStore.updateState(state => removeThoughtFromState(state, thoughtId));
	}

	function setActiveThought(thoughtId: string | null) {
		if (thoughtId === appState.activeThoughtId) {
			appStore.updateState(state => setActiveThoughtInState(state, null));
		} else {
			appStore.updateState(state => setActiveThoughtInState(state, thoughtId));
		}
	}

	function abbreviateText(name: string, slice: number = 10): string {
		return name.length > slice ? name.slice(0, slice) + '...' : name;
	}
</script>

{#snippet thoughtCard(thought: Thought)}
	<HoverCard
		onclick={() => setActiveThought(thought.id)}
		active={appState.activeThoughtId === thought.id}
	>
		<div class="flex items-center justify-between gap-2">
			<div>{thought.text}</div>
			<Button size="icon"
							variant="destructive"
							onclick={() => deleteThought(thought.id)}>
				<Trash />
			</Button>
		</div>
		<div class="flex gap-4">
			{#each thought.tags as tag (tag.id)}
				<span class="text-xs">#{abbreviateText(tag.name)}</span>
			{/each}
		</div>
	</HoverCard>
{/snippet}

<InputForm
	bind:value
	placeholder='Type thoughts here...'
	onSubmit={addThought}
	onKeyDown={onThoughtKeyPress}
	classProp="mb-4"
/>

<div class="flex flex-col gap-2">
	{#each thoughts as thought (thought.id)}
		{@render thoughtCard(thought)}
	{/each}
</div>

{#if thoughts.length === 0}
	<p class="text-gray-500">The mind is empty.</p>
{/if}