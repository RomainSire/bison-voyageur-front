<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('http://localhost:5000/api/menu');
		const menu = await res.json();
		if (res.ok) {
			return {
				props: {
					menu
				}
			};
		} else {
			return {
				status: res.status,
				error: new Error('Could not fetch the menu')
			};
		}
	}
</script>

<script>
	import '../styles/global.css';
	import BurgerMenuBtn from '$lib/components/BurgerMenuBtn.svelte';
	export let menu;
	let categories = menu[0].categories;
	let menuIsOpen = false;
	function menuStateChanges(event) {
		menuIsOpen = event.detail;
	}
</script>

<div class="layout">
	<header class="header">
		<a href="/" class="logo">
			<img src="/logo.svg" alt="logo de Bison Voyageur" />
			<p>Bison<br />Voyageur</p>
		</a>
		<BurgerMenuBtn on:openMenuState={menuStateChanges} />
		<nav class="nav {menuIsOpen ? '' : 'hidden'}">
			<ol class="nav__wrapper">
				{#each categories as category}
					<li>
						<span class="nav__title">{category.label}</span>
						<ol>
							{#if Array.isArray(category.articles)}
								{#each category.articles as article}
									<li class="nav__link">
										<a href="/article/mon-super-article">{article.title}</a>
									</li>
								{/each}
							{/if}
						</ol>
					</li>
				{/each}
			</ol>
		</nav>
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
