<script context="module">
	import { backendUrl, frontendUrl } from '$lib/config';
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
	import { fade, slide } from 'svelte/transition';
	import { marked } from 'marked';

	/**
	 * Convert and display the markdown article
	 */

	// article data from SSR
	export let article;
	// format date
	let date = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(new Date(article.date));

	// replacing original image url by medium size image url
	let content = marked(article.body)
		.replaceAll('/uploads/', `${backendUrl}/uploads/medium_`)
		.replaceAll('<img', '<img loading="lazy"');

	/**
	 * Image gallery management
	 */

	// onMount lifecycle handler: makes all the markdown pictures clickable
	let images;
	onMount(() => {
		images = [...document.querySelectorAll('.markdown img')];
		images.forEach((image) => {
			image.addEventListener('click', onImageClicked);
		});
	});
	let isGalleryDisplayed = false;
	// triggered when an image is clicked
	let currentImgIndex;
	function onImageClicked(e) {
		currentImgIndex = images.findIndex((image) => {
			return image.src === e.target.src;
		});
		updateImageSource();
		isGalleryDisplayed = true;
	}
	// triggered when the next/back image button is clicked
	function changeImage(direction) {
		if (direction === 'next') {
			if (currentImgIndex === images.length - 1) {
				currentImgIndex = 0;
			} else {
				currentImgIndex++;
			}
		} else {
			if (currentImgIndex === 0) {
				currentImgIndex = images.length - 1;
			} else {
				currentImgIndex--;
			}
		}
		updateImageSource();
	}
	// update src and alt attributes to display the image at the correct index
	let src = '';
	let alt = '';
	function updateImageSource() {
		src = images[currentImgIndex].src.replace('medium', 'large');
		alt = images[currentImgIndex].alt;
	}
</script>

<svelte:head>
	<title>{article.title} | Bison Voyageur</title>
	<meta name="description" content={article.summary} />

	<meta name="robots" content="index, follow" />

	<meta property="og:type" content="article" />
	<meta property="og:title" content="{article.title} - Bison Voyageur" />
	<meta property="og:description" content={article.summary} />
	<meta property="og:image" content="{backendUrl}{article.imageUrl}" />
	<meta property="og:url" content="{frontendUrl}/{article.slug}" />
	<meta property="og:site_name" content="Bison Voyageur" />

	<meta name="twitter:title" content="{article.title} - Bison Voyageur" />
	<meta name="twitter:description" content={article.summary} />
	<meta name="twitter:image" content="{backendUrl}{article.imageUrl}" />
	<meta name="twitter:site" content="@BisonVoyageur" />
	<meta name="twitter:creator" content="@BisonVoyageur" />
</svelte:head>

<main transition:slide>
	<section class="hero" style="background-image: url({backendUrl}{article.imageUrl});">
		<h1>{article.title}</h1>
		<a href="#content" class="to-content">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true"
				role="img"
				class="iconify iconify--ic"
				width="32"
				height="32"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 24 24"
				><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z" />
			</svg>
		</a>
	</section>
	<section id="content" class="markdown">
		<h2>{date}</h2>
		{@html content}
	</section>
</main>

{#if isGalleryDisplayed}
	<section class="gallery" transition:fade>
		<button
			class="gallery__btn gallery__close"
			on:click={() => {
				isGalleryDisplayed = false;
			}}
		>
			<!-- close icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true"
				role="img"
				class="iconify iconify--mdi"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
				/>
			</svg>
		</button>
		<button
			class="gallery__btn gallery__next"
			on:click={() => {
				changeImage('next');
			}}
		>
			<!-- next icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true"
				role="img"
				class="iconify iconify--ic"
				width="32"
				height="32"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 24 24"
				><path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z" /></svg
			>
		</button>
		<button
			class="gallery__btn gallery__back"
			on:click={() => {
				changeImage('back');
			}}
		>
			<!-- back icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true"
				role="img"
				class="iconify iconify--ic"
				width="32"
				height="32"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 24 24"
				><path fill="currentColor" d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z" /></svg
			>
		</button>
		{#key src}
			<img {src} {alt} class="gallery__image" transition:slide />
		{/key}
	</section>
{/if}

<style lang="scss">
	.hero {
		width: 100%;
		height: calc(100vh - 75px);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		h1 {
			margin: 0 5%;
			font-size: 5rem;
			line-height: 1em;
			color: #fff;
			background: #0008;
			box-shadow: 0 0 10px #000;
			border-radius: 5px;
			padding: 0.5em;
			text-align: center;
			&::first-letter {
				text-transform: capitalize;
			}
		}
		.to-content {
			color: #fff;
			background: #0008;
			border-radius: 50%;
			box-shadow: 0 0 10px #000;
			padding: 1em;
			position: absolute;
			bottom: 1rem;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	@media (max-width: 800px) {
		.hero h1 {
			font-size: 3.5rem;
		}
	}
	@media (max-width: 400px) {
		.hero h1 {
			font-size: 2.5rem;
		}
	}
	.markdown {
		padding: 2rem 5%;
		h2 {
			margin: 75px 0 0.8em 0;
			font-size: 1.8rem;
			&::first-letter {
				text-transform: capitalize;
			}
		}
	}
	// styles of the markdown are located in the ../../styles/global.css file. styles here are not applied

	.gallery {
		background: #000d;
		position: fixed;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 20;
		&__btn {
			position: absolute;
			background: transparent;
			border: none;
			cursor: pointer;
			padding: 1em;
			svg {
				width: 3rem;
				height: 3rem;
				color: #fff;
			}
		}
		&__close {
			top: 0;
			right: 0;
		}
		&__next {
			right: 0;
			top: 50%;
			transform: translateY(-50%);
		}
		&__back {
			left: 0;
			top: 50%;
			transform: translateY(-50%);
		}
		&__image {
			max-width: 100%;
			max-height: 100%;
		}
	}
</style>
