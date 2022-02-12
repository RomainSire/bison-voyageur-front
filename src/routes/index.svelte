<script context="module">
	export async function load({ fetch }) {
		const rawArticle = await fetch('http://localhost:5000/api/articles');
		const articles = await rawArticle.json();
		if (rawArticle.ok) {
			return {
				props: {
					articles
				}
			};
		} else {
			return {
				status: rawArticle.status,
				error: new Error('Could not fetch the articles')
			};
		}
	}
</script>

<script>
	export let articles;
</script>

<main>
	{#each articles as article}
		<div>{article.title}</div>
	{/each}
</main>
