<script>
	import { range } from 'lodash-es';
	import chroma from 'chroma-js';
	import lights from '../stores/lights';
	import { spreadColors } from '../lib/utils';

	let width;
	let height;
	let lightSize = 50;
	let lightSpace = 0.4;

	$: columns = Math.ceil(width / lightSize + 3);
	$: rows = Math.ceil(height / lightSize + 3);
	$: spreadLights = spreadColors($lights.colors, columns * rows, $lights.id);
</script>

<div
	class="lights-background"
	bind:clientWidth={width}
	bind:clientHeight={height}
	style="--light-size: {lightSize * (1 - lightSpace)}px; --light-space: {lightSize * lightSpace}px;"
>
	<div class="lights-container">
		{#if spreadLights && spreadLights.length && spreadLights[0]}
			{#each spreadLights as color, ci (ci)}
				<div
					class="light"
					style="color: {chroma(color)
						.alpha(0.5)
						.css()}; background-color: {color}; border-color: {chroma(color).brighten(0.5).css()}"
				/>
			{/each}
		{/if}
	</div>
</div>

<style>
	.lights-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: -100;
	}

	.lights-container {
		position: absolute;
		top: -10px;
		left: -10px;
		width: 120%;
		height: 120%;
		overflow: hidden;
	}

	.light {
		width: var(--light-size);
		height: var(--light-size);
		border-radius: 50%;
		background-color: var(--color-bg);
		float: left;
		margin-right: var(--light-space);
		margin-bottom: var(--light-space);
		border: 2px solid transparent;
		box-shadow: 0 0 4px 4px;
		transition: all 2s ease-in-out;
	}
</style>
