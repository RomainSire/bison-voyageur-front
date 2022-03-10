<script context="module">
	export function load({ error }) {
		return {
			props: { error }
		};
	}
</script>

<script>
	export let error;
	console.error(error.message);
</script>

<svelte:head>
	<title>404 petite erreur.. | Bison Voyageur</title>
	<meta
		name="description"
		content="Ooops, il y a eu une petite erreur! Revenez sur la page d'accueil."
	/>
</svelte:head>

<main>
	<section>
		<div class="message">Oups! Il y a un petit problème...</div>
		<a href="/" class="link">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true"
				role="img"
				class="iconify iconify--ic"
				width="32"
				height="32"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 24 24"
				><path fill="currentColor" d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" /></svg
			>
			Retourner à la page d'accueil
		</a>
	</section>
</main>

<style lang="scss">
	@use '../styles/variables' as var;
	main {
		width: 100%;
		height: calc(100vh - 75px);
		background-image: url('/static/404.jpg');
		background-position: 50% 15%;
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;
		section {
			background: #0008;
			box-shadow: 0 0 10px #000;
			border-radius: 5px;
			padding: 0.5em;
			text-align: center;
			color: #7fffd4;
			font-family: var.$font-body;
			position: absolute;
			top: 60%;
			left: 50%;
			transform: translateX(-50%);
		}
		.message {
			font-size: 2rem;
			line-height: 1em;
		}
		.link {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: center;
			transition: color 200ms ease-in-out;
			&:hover {
				color: #43c2e9;
			}
		}
	}
</style>
