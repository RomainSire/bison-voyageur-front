<script context="module">
	export async function load({ stuff }) {
		return {
			props: {
				menu: stuff.menu
			}
		};
	}
</script>

<script>
	export let menu;
	let categories = menu[0].categories;
</script>

<nav class="nav">
	<ol>
		{#each categories as category}
			<li class="nav__block">
				<span class="nav__title">{category.label}</span>
				<ol>
					{#if Array.isArray(category.articles)}
						{#each category.articles as article}
							<li class="nav__link">
								<a href="/article/{article.slug}">
									{article.title}
								</a>
							</li>
						{/each}
					{/if}
				</ol>
			</li>
		{/each}
	</ol>
</nav>

<style lang="scss">
	@use '../styles/variables' as var;
	.nav {
		color: var.$color-text;
		padding: 1em;
		&__block {
			margin-bottom: 2.5rem;
		}
		&__title {
			display: block;
			font-family: var.$font-title;
			font-size: 1.3rem;
			margin-bottom: 1.5rem;
		}
		&__link {
			line-height: 1.2rem;
			margin: 1.2rem 0;
			a:hover {
				text-decoration: underline;
			}
		}
	}
</style>
