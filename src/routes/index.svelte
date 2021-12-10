<script context="module">
	export const prerender = true;
</script>

<script>
	import ColorText from '../components/color-text.svelte';
	import { spreadColors } from '$lib/utils';
	import { apiDomain } from '../lib/config';
	import lights from '../stores/lights';

	let inputLights;
	let inputError;
	let suggestions;

	async function submitLights() {
		inputError = '';

		if (inputLights) {
			const f = await fetch(`${apiDomain}/lights`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					input: inputLights,
					source: 'web'
				})
			});
			const response = await f.json();

			if (!response.success) {
				inputError = response.error;
				suggestions = response.suggestions;
			}

			inputLights = '';
		}
	}

	function updateLights(color) {
		inputLights = color;
	}
</script>

<svelte:head>
	<title>Lumiere | Community Lighting</title>
</svelte:head>

<div class="container">
	<section class="current-lights">
		<h1 class="sr-only">Current lights</h1>

		{#if $lights.colorNames}
			<p>
				Showing: <strong>{$lights.colorNames.join(', ')}</strong>
			</p>
		{:else if $lights.image}
			<p>
				Showing: <strong><em>Colors from an uploaded image.</em></strong>
			</p>
		{/if}
	</section>

	<section>
		<h1 class="sr-only">Update lights</h1>

		<form on:submit|preventDefault={submitLights}>
			<label class="sr-only" for="change-lights">Change lights</label>

			<div class="inputs">
				<input
					type="text"
					id="change-lights"
					bind:value={inputLights}
					placeholder="Change lights"
					aria-describedby="change-lights-help"
				/>
				<input type="submit" value="Submit" />
			</div>

			<small id="change-lights-help">
				Change lights by typing in colors. There are thousands of color names and combinations to
				choose from.

				{#if inputError}
					<span class="error">
						{inputError}
					</span>
				{/if}

				{#if suggestions}
					Try some colors like
					{#each suggestions as s, si (s.id)}
						<button class="suggestion" on:click|preventDefault={updateLights(s.name)}>
							<strong><ColorText color={s} /></strong>
						</button>

						{si === suggestions.length - 1 ? '' : ' or '}
					{/each}
				{/if}
			</small>
		</form>
	</section>
</div>

<style>
	.container {
		background-color: rgba(0, 0, 0, 0.8);
		margin: 1rem;
		padding: 2rem;
		border-radius: var(--border-radius);
		max-width: 40rem;
		min-width: 50vw;
	}

	.current-lights {
		margin-top: 0;
		padding-bottom: 1rem;
		margin-bottom: 2rem;
		border-bottom: 2px solid var(--color-white);
	}

	.current-lights p {
		margin-top: 0;
		margin-bottom: 0;
	}

	.inputs {
		display: flex;
		width: 100%;
	}

	input[type='text'] {
		width: 100%;
		margin-right: 1rem;
	}

	.error {
		color: var(--color-error);
	}

	.suggestion {
		font-size: 1em;
		display: inline-block;
		margin: 0 0.15rem;
		padding: 0.15rem 0.25rem;
		background-color: var(--color-black);
		border: 1px solid transparent;
		border-radius: var(--border-radius);
	}
</style>
