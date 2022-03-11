<script context="module">
	export async function load({ stuff }) {
		return {
			props: {
				articles: stuff.articles
			}
		};
	}
</script>

<script>
	import { backendUrl, frontendUrl } from '$lib/config';
	export let articles;
	let lastArticles = articles.slice(0, 9);
	lastArticles.forEach((article) => {
		article.filename = article.imageUrl.split('/')[2];
	});
</script>

<svelte:head>
	<title>Bison Voyageur autour du monde</title>
	<meta
		name="description"
		content="Prenez place à mes côtés pendant que je vous partage l'expérience de mon tour du monde de 1 an en sac à dos à travers l'Europe, l'Asie, l'Océanie et l'Amérique Latine."
	/>

	<meta name="robots" content="index, follow" />

	<meta property="og:type" content="website" />
	<meta property="og:title" content="Bison Voyageur autour du monde" />
	<meta
		property="og:description"
		content="Prenez place à mes côtés pendant que je vous partage l'expérience de mon tour du monde de 1 an en sac à dos à travers l'Europe, l'Asie, l'Océanie et l'Amérique Latine."
	/>
	<meta
		property="og:image"
		content="{backendUrl}/uploads/medium_dariusz_sankowski_3_Oi_Y_Mg_DKJ_6k_unsplash_f35d7ece69.jpg"
	/>
	<meta property="og:url" content={frontendUrl} />
	<meta property="og:site_name" content="Bison Voyageur" />

	<meta name="twitter:title" content="Bison Voyageur autour du monde" />
	<meta
		name="twitter:description"
		content="Prenez place à mes côtés pendant que je vous partage l'expérience de mon tour du monde de 1 an en sac à dos à travers l'Europe, l'Asie, l'Océanie et l'Amérique Latine."
	/>
	<meta
		name="twitter:image"
		content="{backendUrl}/uploads/medium_dariusz_sankowski_3_Oi_Y_Mg_DKJ_6k_unsplash_f35d7ece69.jpg"
	/>
	<meta name="twitter:site" content="@BisonVoyageur" />
	<meta name="twitter:creator" content="@BisonVoyageur" />
</svelte:head>

<main class="grid">
	{#each lastArticles as article}
		<a sveltekit:prefetch href="/article/{article.slug}" class="img-wrapper">
			<img
				src="{backendUrl}/uploads/small_{article.filename}"
				alt="Photo de l'article: {article.title}"
			/>
			<h1>{article.title}</h1>
			<div class="content">
				<p>{article.summary}</p>
			</div>
		</a>
	{/each}
</main>

<style lang="scss">
	@use '../styles/variables' as var;
	// For mobile
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		grid-auto-rows: 1fr;
	}
	.img-wrapper {
		position: relative;
		overflow: hidden;
		// card entrance animation
		animation: cardEndrance 700ms ease-out;
		animation-fill-mode: backwards;
		@for $i from 1 through 9 {
			&:nth-child(#{$i}) {
				animation-delay: #{$i * 100}ms;
			}
		}
		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
		}
		h1 {
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
			margin: 0;
			font-size: 1.2rem;
			padding: 1.5em 0.5em 0.5em 0.5em;
			color: #fff;
			background: linear-gradient(0deg, #000c 0%, #0008 60%, #0000 100%);
		}
		.content {
			position: absolute;
			inset: 0;
			padding: 1.5rem 1rem;
			background: rgba(255, 255, 255, 0.4);
			opacity: 0;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		> * {
			transition: all 200ms ease-in-out;
		}
		&:hover {
			.content {
				opacity: 1;
			}
			img,
			h1 {
				filter: blur(5px) grayscale(0.5);
				transform: scale(1.1);
			}
		}
	}

	// For desktop
	@media screen and (min-width: 900px) {
		$stagger-delay: 100ms;

		.grid {
			height: calc(100vh - 75px);
			grid-template-rows: repeat(3, 1fr);
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@keyframes cardEndrance {
		from {
			opacity: 0;
			transform: scale(0.3);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
