<script context="module">
	// get menu as SSR
	export async function load({ fetch }) {
		const [resMenu, resArticles] = await Promise.all([
			fetch('http://localhost:5000/api/menu'),
			fetch('http://localhost:5000/api/articles')
		]);
		const [menu, articles] = await Promise.all([resMenu.json(), resArticles.json()]);
		if (resMenu.ok && resArticles.ok) {
			return {
				props: {
					menu,
					articles
				}
			};
		} else if (!resMenu.ok) {
			return {
				status: resMenu.status,
				error: new Error('Could not fetch the menu')
			};
		} else {
			return {
				status: resArticles.status,
				error: new Error('Could not fetch the articles')
			};
		}
	}
</script>

<script>
	import '../styles/global.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import { articlesStore } from '$lib/store';

	// menu data from SSR
	export let menu;
	export let articles;

	// save articles in store
	articlesStore.update(() => {
		return articles;
	});

	// state of navigation menu (binded to Navigation and BurgerMenuBtn components)
	let menuIsOpen = false;
</script>

<div class="layout">
	<header class="header">
		<a
			href="/"
			class="logo"
			on:click={() => {
				menuIsOpen = false;
			}}
		>
			<img src="/logo.svg" alt="logo de Bison Voyageur" />
			<p>Bison<br />Voyageur</p>
		</a>
		<Navigation {menu} bind:menuIsOpen />
	</header>
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	@use '../styles/variables' as var;

	.layout {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
	}
	.header {
		position: relative;
		background-color: var.$color-bg-head;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 0 10px #333;
	}
	.logo {
		padding: 5px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		img {
			height: 65px;
		}
		p {
			flex-grow: 10;
			font-family: var.$font-title;
			margin: 0 0 0 0.5em;
			font-size: 2rem;
			line-height: 1.8rem;
			color: var.$color-title;
		}
	}
	.nav {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: var.$color-bg-head;
		color: var.$color-text;
		overflow: hidden;
		transform-origin: top;
		transition: all 300ms;
		&.hidden {
			transform: scaleY(0);
			opacity: 0;
		}
		&__wrapper {
			padding: 1em;
		}
		&__title {
			display: block;
			font-family: var.$font-title;
			font-size: 1.3em;
			margin-bottom: 0.4em;
		}
		&__link {
			line-height: 1.1em;
			margin-left: 1em;
			margin-bottom: 0.8em;
		}
	}
</style>
