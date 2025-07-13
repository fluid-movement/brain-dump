export type Thought = {
	id: string;
	text: string;
	tags: Tag[]
	createdAt: Date;
	updatedAt: Date;
};

export type AppState = {
	thoughts: Thought[];
	tags: Tag[];
	activeThoughtId: string | null;
}

export type Tag = {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}