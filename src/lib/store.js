import { writable } from 'svelte/store';

// All articles (without the body)
export const articlesStore = writable(null);
