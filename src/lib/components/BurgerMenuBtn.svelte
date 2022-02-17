<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let isOpen = false;
	function toggleOpenNav() {
		isOpen = !isOpen;
		dispatch('openMenuState', isOpen);
	}
</script>

<button
	class="menu {isOpen ? 'open' : ''}"
	aria-label={isOpen ? 'fermer le menu de navigation' : 'ouvrir le menu de navigation'}
	on:click={toggleOpenNav}
>
	{#if isOpen}
		<!-- "close" icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			aria-hidden="true"
			role="img"
			class="iconify iconify--mdi"
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
			/></svg
		>
	{:else}
		<!-- "menu" icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			aria-hidden="true"
			role="img"
			class="iconify iconify--mdi"
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 24 24"
			><path fill="currentColor" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z" /></svg
		>
	{/if}
</button>

<style lang="scss">
	@use '../../styles/variables' as var;
	.menu {
		width: 50px;
		height: 50px;
		cursor: pointer;
		border: none;
		background: none;
		svg {
			width: 100%;
			height: 100%;
			color: var.$color-title;
		}
	}
</style>
