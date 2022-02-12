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
	<header>
		<div class="logo">LOGO</div>
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

<style>
	.wrapper {
		height: 100vh;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
	}
</style>
