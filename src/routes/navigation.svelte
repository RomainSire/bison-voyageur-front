<script context="module">
	import { fade, slide } from 'svelte/transition';
	import { backendUrl, frontendUrl } from '$lib/config';
	export async function load({ stuff }) {
		return {
			props: {
				menu: stuff.menu,
				articlesCollection: stuff.articles
			}
		};
	}
</script>

<script>
	export let menu;
	export let articlesCollection;
	let categories = menu[0].categories;

	// get the menu's article's thumbnail url
	function getThumbnailUrl(article) {
		return articlesCollection
			.find((item) => {
				return item.id === article.id;
			})
			.imageUrl.replace('/uploads/', `${backendUrl}/uploads/thumbnail_`);
	}

	// image preview appearing and following the mouse
	import { spring } from 'svelte/motion';
	let coords = spring(
		{ x: 50, y: 50 },
		{
			stiffness: 0.1,
			damping: 0.25
		}
	);
	let src = '';
	function handleMousemove(event) {
		coords.set({ x: event.pageX, y: event.pageY });
	}
	function handleMouseEnter(event) {
		src = event.target.dataset.image;
	}
	function handleMouseLeave() {
		src = '';
	}
</script>

<svelte:head>
	<title>Tous les articles | Bison Voyageur</title>
	<meta
		name="description"
		content="Consultez la liste des articles que j'ai rédigés lors de mon tour du monde de 1 an en sac à dos à travers l'Europe, l'Asie, l'Océanie et l'Amérique Latine."
	/>

	<meta name="robots" content="index, follow" />

	<meta property="og:type" content="website" />
	<meta property="og:title" content="Tous les articles - Bison Voyageur" />
	<meta
		property="og:description"
		content="Consultez la liste des articles que j'ai rédigés lors de mon tour du monde de 1 an en sac à dos à travers l'Europe, l'Asie, l'Océanie et l'Amérique Latine."
	/>
	<meta
		property="og:image"
		content="{backendUrl}/uploads/medium_dariusz_sankowski_3_Oi_Y_Mg_DKJ_6k_unsplash_f35d7ece69.jpg"
	/>
	<meta property="og:url" content="{frontendUrl}/navigation" />
	<meta property="og:site_name" content="Bison Voyageur" />

	<meta name="twitter:title" content="Tous les articles - Bison Voyageur" />
	<meta
		name="twitter:description"
		content="Consultez la liste des articles que j'ai rédigés lors de mon tour du monde de 1 an en sac à dos à travers l'Europe, l'Asie, l'Océanie et l'Amérique Latine."
	/>
	<meta
		name="twitter:image"
		content="{backendUrl}/uploads/medium_dariusz_sankowski_3_Oi_Y_Mg_DKJ_6k_unsplash_f35d7ece69.jpg"
	/>
	<meta name="twitter:site" content="@BisonVoyageur" />
	<meta name="twitter:creator" content="@BisonVoyageur" />
</svelte:head>

<nav class="nav" on:mousemove={handleMousemove} transition:slide>
	<ol>
		{#each categories as category}
			{#if typeof category.articles !== 'undefined'}
				<li class="nav__block">
					<span class="nav__title">{category.label}</span>
					<ol>
						{#if Array.isArray(category.articles)}
							{#each category.articles as article}
								<li class="nav__item">
									<a
										sveltekit:prefetch
										href="/article/{article.slug}"
										class="nav__link"
										data-image={getThumbnailUrl(article)}
										on:mouseenter={handleMouseEnter}
										on:mouseleave={handleMouseLeave}
									>
										{article.title}
									</a>
								</li>
							{/each}
						{/if}
					</ol>
				</li>
			{/if}
		{/each}
	</ol>
	{#key src}
		<img
			transition:fade
			{src}
			alt=""
			class="floating-img"
			style="transform: translate({$coords.x + 20}px, {$coords.y + 20}px);"
		/>
	{/key}
</nav>

<style lang="scss">
	@use '../styles/variables' as var;
	.nav {
		color: var.$color-text;
		padding: 1em;
		margin-bottom: 150px;
		&__block {
			margin-bottom: 2.5rem;
			text-align: center;
			position: relative;
		}
		&__title {
			display: block;
			font-family: var.$font-title;
			font-size: 1.3rem;
			margin-bottom: 1.5rem;
		}
		&__item {
			line-height: 1.2rem;
			margin: 1.2rem 0;
		}
		&__link {
			display: inline-block;
			position: relative;
			opacity: 0.6;
			transition: opacity 150ms ease-in-out;
			&::after {
				content: '';
				border-bottom: 2px solid var.$color-text;
				position: absolute;
				left: 0;
				right: 0;
				bottom: -0.1em;
				transform: scaleX(0);
				transform-origin: left;
				transition: transform 150ms ease-in-out;
			}
			&:hover {
				opacity: 1;
				&::after {
					transform: scaleX(1);
				}
			}
		}
	}

	.floating-img {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 30;
	}
</style>
