import type { Thought } from '$lib/types';

export const createThought = (text: string): Thought => ({
	id: crypto.randomUUID(),
	text,
	tags: [],
	createdAt: new Date(),
	updatedAt: new Date()
});

export const updateThought = (
	thought: Thought,
	updates: Partial<Omit<Thought, 'id' | 'createdAt'>>
): Thought => ({
	...thought,
	...updates,
	id: thought.id,
	createdAt: thought.createdAt,
	updatedAt: new Date()
});
