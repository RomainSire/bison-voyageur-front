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
				stuff: {
					articles,
					menu
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
</script>

<div class="layout">
	<header class="header">
		<a href="/" class="logo">
			<img src="/logo.svg" alt="logo de Bison Voyageur" />
			<p>Bison<br />Voyageur</p>
		</a>
		<a href="/navigation" class="menu">Menu</a>
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
		position: sticky;
		top: 0;
		background-color: var.$color-bg-head;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		padding: 5px;
	}
	.logo {
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
	.menu {
		font-family: var.$font-title;
		font-size: 1.5rem;
		color: var.$color-title;
		padding: 0.5rem 1.5rem;
		transition: transform 200ms ease-in-out;
		&:hover {
			transform: scale(1.03);
		}
	}
</style>
