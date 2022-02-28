<script context="module">
	import { backendUrl } from '$lib/config';
	// get Menu and Articles list as SSR
	export async function load({ fetch }) {
		const [resMenu, resArticles] = await Promise.all([
			fetch(`${backendUrl}/api/menu`),
			fetch(`${backendUrl}/api/articles`)
		]);
		const [menu, articles] = await Promise.all([resMenu.json(), resArticles.json()]);
		if (resMenu.ok && resArticles.ok) {
			return {
				props: {
					menu
				},
				stuff: {
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

	// get menu from SSR, define a state of navigation and pass it to Navigation component as prop (state of navigation is binded to Navigation and BurgerMenuBtn components)
	export let menu;
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
	}
	.logo {
		padding: 5px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		transition: transform 200ms ease-in-out;
		&:hover {
			transform: scale(1.03);
		}
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
</style>
