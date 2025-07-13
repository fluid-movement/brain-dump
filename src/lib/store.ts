// src/lib/stores/appStore.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { AppState } from '$lib/types';

const STORAGE_KEY = 'brain-dump-store';

const initialState: AppState = {
	thoughts: [],
	tags: [],
	activeThoughtId: null
};

// Custom serializer/deserializer for Date objects
function serialize(state: AppState): string {
	return JSON.stringify(state);
}

function deserialize(json: string): AppState {
	const parsed = JSON.parse(json);

	// Convert date strings back to Date objects
	return {
		...parsed,
		thoughts:
			parsed.thoughts?.map((thought: any) => ({
				...thought,
				createdAt: new Date(thought.createdAt),
				updatedAt: new Date(thought.updatedAt)
			})) || [],
		categories:
			parsed.categories?.map((category: any) => ({
				...category,
				createdAt: new Date(category.createdAt),
				updatedAt: new Date(category.updatedAt)
			})) || []
	};
}

function createAppStore() {
	const { subscribe, set, update } = writable<AppState>(initialState);

	// Save to localStorage whenever state changes
	function saveToStorage(state: AppState) {
		if (browser) {
			try {
				localStorage.setItem(STORAGE_KEY, serialize(state));
			} catch (error) {
				console.error('Failed to save to localStorage:', error);
			}
		}
	}

	return {
		subscribe,

		// Initialize store with data from localStorage
		init: () => {
			if (browser) {
				try {
					const stored = localStorage.getItem(STORAGE_KEY);
					if (stored) {
						const state = deserialize(stored);
						set(state);
					}
				} catch (error) {
					console.error('Failed to load from localStorage:', error);
					set(initialState);
				}
			}
		},

		// Update specific parts of state
		updateState: (updater: (state: AppState) => AppState) => {
			update((state) => {
				const newState = updater(state);
				saveToStorage(newState);
				return newState;
			});
		}
	};
}

export const appStore = createAppStore();
