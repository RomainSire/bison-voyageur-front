<script context="module">
	export async function load({ fetch }) {
		const rawMenu = await fetch('http://localhost:5000/api/menu');
		const menu = await rawMenu.json();
		if (rawMenu.ok) {
			return {
				props: {
					menu
				}
			};
		} else {
			return {
				status: rawMenu.status,
				error: new Error('Could not fetch the menu')
			};
		}
	}
</script>

<script>
	import '../styles/global.css';
	export let menu;
	let categories = menu[0].categories;
</script>

<div class="wrapper">
	<header class="header">
		<div class="logo">
			<img src="/logo.svg" alt="logo de Bison Voyageur" />
			<p>Bison<br />Voyageur</p>
		</div>
		<nav>
			<ol>
				{#each categories as category}
					<li>
						{category.label}
						<ol>
							{#if Array.isArray(category.articles)}
								{#each category.articles as article}
									<li>
										{article.title}
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
	.wrapper {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
	}
	.header {
		background-color: #f0f0f0;
	}
	.logo {
		padding: 5px;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		img {
			width: 70px;
		}
		p {
			font-family: Akaya, sans-serif;
			margin: 0 0 0 0.5em;
			font-size: 2rem;
			color: #754c24;
		}
	}
	nav {
		display: none;
	}
</style>
