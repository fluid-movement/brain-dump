import type { AppState, Thought } from '$lib/types';
import { createThought, updateThought } from '$lib/actions/thoughtActions';
import type { Tag } from '$lib/types';
import { createTag, updateTag } from '$lib/actions/tagActions';

export const addNewThought = (state: AppState, text: string): AppState => ({
	...state,
	thoughts: [createThought(text), ...state.thoughts]
});

export const updateThoughtInState = (
	state: AppState,
	thoughtId: string,
	updates: Partial<Omit<Thought, 'id' | 'createdAt'>>
): AppState => {
	const existingThought = state.thoughts.find((t) => t.id === thoughtId);
	if (!existingThought) return state;

	const updatedThought = updateThought(existingThought, updates);
	return {
		...state,
		thoughts: state.thoughts.map((thought) => (thought.id === thoughtId ? updatedThought : thought))
	};
};

export const removeThoughtFromState = (state: AppState, thoughtId: string): AppState => ({
	...state,
	thoughts: state.thoughts.filter((thought) => thought.id !== thoughtId)
});

export const setActiveThoughtInState = (state: AppState, thoughtId: string | null): AppState => ({
	...state,
	activeThoughtId: thoughtId
});

export const addNewTag = (state: AppState, name: string): AppState => ({
	...state,
	tags: [createTag(name), ...state.tags]
});

export const updateTagInState = (
	state: AppState,
	tagId: string,
	updates: Partial<Omit<Tag, 'id' | 'createdAt'>>
): AppState => {
	const existingTag = state.tags.find((t) => t.id === tagId);
	if (!existingTag) return state;

	const updatedTag = updateTag(existingTag, updates);
	return {
		...state,
		tags: state.tags.map((tag) => (tag.id === tagId ? updatedTag : tag))
	};
};

export const removeTagFromState = (state: AppState, tagId: string): AppState => ({
	...state,
	tags: state.tags.filter((tag) => tag.id !== tagId),
	thoughts: state.thoughts.map((thought) => ({
		...thought,
		tags: thought.tags.filter((tag) => tag.id !== tagId)
	}))
});

export const toggleTagOnThought = (state: AppState, thoughtId: string, tag: Tag): AppState => {
	const thought = state.thoughts.find((t) => t.id === thoughtId);
	if (!thought) return state;

	const hasTag = thought.tags.some((t) => t.id === tag.id);
	const updatedThought = updateThought(thought, {
		tags: hasTag ? thought.tags.filter((t) => t.id !== tag.id) : [...thought.tags, tag]
	});

	return {
		...state,
		thoughts: state.thoughts.map((t) => (t.id === thoughtId ? updatedThought : t))
	};
};
