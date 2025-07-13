import type { Tag } from '../types';

export const createTag = (name: string): Tag => ({
	id: crypto.randomUUID(),
	name,
	createdAt: new Date(),
	updatedAt: new Date()
});

export const updateTag = (
	tag: Tag,
	updates: Partial<Omit<Tag, 'id' | 'createdAt'>>
): Tag => ({
	...tag,
	...updates,
	id: tag.id,
	createdAt: tag.createdAt,
	updatedAt: new Date()
});