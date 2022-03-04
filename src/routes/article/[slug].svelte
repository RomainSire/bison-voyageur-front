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

<div class="wrapper">
	<h1>{article.title}</h1>
	<h2>{date}</h2>
	<div class="markdown">
		{@html content}
	</div>
</div>

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

	.gallery {
		background: #000d;
		position: fixed;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
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
