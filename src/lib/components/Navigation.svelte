<script>
	import BurgerMenuBtn from '$lib/components/BurgerMenuBtn.svelte';
	// get props
	export let menu;
	export let menuIsOpen = false;
	let categories = menu[0].categories;
</script>

<BurgerMenuBtn bind:menuIsOpen />
<nav class="nav {menuIsOpen ? '' : 'hidden'}">
	<ol class="nav__wrapper">
		{#each categories as category}
			<li>
				<span class="nav__title">{category.label}</span>
				<ol>
					{#if Array.isArray(category.articles)}
						{#each category.articles as article}
							<li class="nav__link">
								<a
									href="/article/mon-super-article"
									on:click={() => {
										menuIsOpen = false;
									}}
								>
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
	@use '../../styles/variables' as var;
	.nav {
		position: absolute;
		z-index: 10;
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
