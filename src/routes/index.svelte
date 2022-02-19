<script>
	import { articlesStore } from '$lib/store';

	let articles;

	// get articles from store
	articlesStore.subscribe((value) => {
		articles = value;
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
