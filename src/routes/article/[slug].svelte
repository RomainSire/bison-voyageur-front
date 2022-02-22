<script context="module">
	// get one article as SSR
	export async function load({ fetch, params, stuff }) {
		const article = stuff.articles.find((article) => {
			return article.slug === params.slug;
		});
		const res = await fetch(`http://localhost:5000/api/articles/${article.id}`);
		const content = await res.json();

		article.body = content.body;

		if (res.ok) {
			return {
				props: {
					article
				}
			};
		} else {
			return {
				status: res.status,
				error: new Error("Could not fetch the article's content")
			};
		}
	}
</script>

<script>
	// article data from SSR
	export let article;
	console.log(article);
</script>

<h1>{article.title}</h1>
<h2>{article.date}</h2>
<div>{article.body}</div>
