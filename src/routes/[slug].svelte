<script context="module">
	export async function load({ fetch, params }) {
		const slug = params.slug;
		console.log(slug);
		const id = 12; //à changer !
		const res = await fetch(`http://localhost:5000/api/articles/${id}`);
		const article = await res.json();
		if (res.ok) {
			return {
				props: {
					article
				}
			};
		} else {
			return {
				status: res.status,
				error: new Error('Could not fetch the article')
			};
		}
	}
</script>

<script>
	export let article;
	console.log(article);
</script>

<h1>Hello World</h1>
