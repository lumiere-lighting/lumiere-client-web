<script>
	import '../app.css';
	import LightsBackground from '../components/lights-background.svelte';
	import ColorSelector from '../components/color-selector.svelte';
</script>

<LightsBackground />

<header class="sr-only">
	<h1>Lumiere</h1>

	<p>
		Lumiere is a <acronym title="Do-It-Yourself">DIY</acronym>, community-controlled holiday
		lighting system. Anyone can submit new colors for the lighting, and any attached device will
		have their lights change instantly.
	</p>
</header>

<main>
	<ColorSelector />
</main>

<footer />

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		height: 100vh;
	}

	@media screen and (min-width: 850px) {
		main {
			justify-content: center;
		}
	}
</style>
