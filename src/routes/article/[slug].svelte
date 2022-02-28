<script context="module">
	import { backendUrl } from '$lib/config';
	// get one article as SSR
	export async function load({ fetch, params, stuff }) {
		const article = stuff.articles.find((article) => {
			return article.slug === params.slug;
		});
		const res = await fetch(`${backendUrl}/api/articles/${article.id}`);
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
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	// article data from SSR
	export let article;
	// format date
	let date = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(new Date(article.date));

	// replacing original image url by medium size image url
	let content = marked(article.body)
		.replaceAll('/uploads/', `${backendUrl}/uploads/medium_`)
		.replaceAll('<img', '<img loading="lazy"');

	// onMount lifecycle handler: makes all the markdown pictures clickable
	let images;
	onMount(() => {
		images = [...document.querySelectorAll('.markdown img')];
		images.forEach((image) => {
			image.addEventListener('click', onImageClicked);
		});
	});

	// triggered when an image is clicked
	function onImageClicked(e) {
		const clickedImgIndex = images.findIndex((image) => {
			return image.src === e.target.src;
		});
		console.log(clickedImgIndex);
	}
</script>

<div class="wrapper">
	<h1>{article.title}</h1>
	<h2>{date}</h2>
	<div class="markdown">
		{@html content}
	</div>
</div>

<style lang="scss">
	.wrapper {
		padding: 2rem 5%;
		h1,
		h2 {
			margin: 0.8em 0;
			&::first-letter {
				text-transform: capitalize;
			}
		}
	}
	// styles of the markdown are located in the ../../styles/global.css file. styles here are not applied
</style>
