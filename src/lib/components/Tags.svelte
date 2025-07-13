<script lang="ts">
	import { appStore } from '$lib/store';
	import {
		addNewTag,
		removeTagFromState, setActiveTagInState,
		toggleTagOnThought
	} from '$lib/actions/appStateActions';
	import type { AppState, Tag } from '$lib/types';
	import { Button } from '$lib/components/ui/button';
	import { Trash } from '@lucide/svelte';
	import InputForm from '$lib/components/InputForm.svelte';
	import HoverCard from '$lib/components/HoverCard.svelte';

	let { appState }: { appState: AppState } = $props();
	let value = $state('');
	let tags = $derived(
		appState.tags.filter((tag) => (value.length > 0 ? tag.name.search(value) !== -1 : true))
	);

	function addTag(event: Event) {
		event.preventDefault();
		if (value.trim() !== '') {
			appStore.updateState((state) => addNewTag(state, value));
			value = '';
		}
	}

	function onTagKeyPress(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			value = '';
		}
	}

	function deleteTag(tagId: string, event: Event) {
		event.stopPropagation(); // Prevents the event from bubbling up
		appStore.updateState((state) => removeTagFromState(state, tagId));
	}

	function toggleTag(tag: Tag) {
		const activeThoughtId = appState.activeThoughtId;
		if (!activeThoughtId) {
			const id = appState.activeTagId === tag.id ? null : tag.id;
			appStore.updateState((state) => setActiveTagInState(state, id));
			return;
		}

		appStore.updateState((state) => toggleTagOnThought(state, activeThoughtId, tag));
	}

	function isTagActive(tag: Tag): boolean {
		const activeThoughtId = appState.activeThoughtId;
		if (!activeThoughtId) {
			return tag.id === appState.activeTagId;
		}
		const thought = appState.thoughts.find((t) => t.id === activeThoughtId);
		return thought ? thought.tags.some((t) => t.id === tag.id) : false;
	}

	function tagCount(tag: Tag): number {
		return appState.thoughts.filter((thought) => thought.tags.some((t) => t.id === tag.id)).length;
	}
</script>

{#snippet tagCard(tag: Tag)}
	<HoverCard
		class="flex gap-4 items-center justify-between"
		active={isTagActive(tag)}
		onclick={() => toggleTag(tag)}
	>
		<span class="border rounded-full flex items-center justify-center w-8 h-8 text-xs">{tagCount(tag)}</span>
		<span class="grow">#{tag.name}</span>
		<Button
			size="icon"
			variant="destructive"
			onclick={(e) => deleteTag(tag.id, e)}>
			<Trash />
		</Button>
	</HoverCard>
{/snippet}

<InputForm
	bind:value
	placeholder="Tags ..."
	onSubmit={addTag}
	onKeyDown={onTagKeyPress}
	classProp="mb-4"
/>

<div class="flex flex-col gap-2">
	{#each tags as tag (tag.id)}
		{@render tagCard(tag)}
	{/each}
</div>
{#if tags.length === 0}
	<p class="text-gray-500">Create some tags.</p>
{/if}
