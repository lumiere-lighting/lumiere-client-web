<script>
	import '../app.css';
	import LightsBackground from '../components/lights-background.svelte';
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
	<slot />
</main>

<footer />

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}
</style>
