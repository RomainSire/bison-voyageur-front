<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('http://localhost:5000/api/articles');
		const articles = await res.json();
		if (res.ok) {
			return {
				props: {
					articles
				}
			};
		} else {
			return {
				status: res.status,
				error: new Error('Could not fetch the articles')
			};
		}
	}
</script>

<script>
	import { articlesStore } from '$lib/store';
	export let articles;
	articlesStore.update(() => {
		return articles;
	});
</script>

<main>
	{#each articles as article}
		<div>{article.title}</div>
	{/each}
</main>

<style>
	main {
		background-color: lightcoral;
	}
</style>
