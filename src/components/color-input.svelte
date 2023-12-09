<script>
	// Dependencies
	import chroma from 'chroma-js';
	import { debounce } from 'lodash-es';
	import { colorsIndex } from '../stores/colors';

	// Props
	export let inputColors = '';
	export let id = 'input-colors';
	let suggestions = null;
	let suggestionsPosition = 'bottom';
	let suggestionSelected = null;
	let recentSearch = '';

	// Computed
	$: hasSuggestions = suggestions && suggestions.length;
	$: suggestions = inputColors === '' ? [] : suggestions;

	// Suggest colors
	function suggestColorsSimple() {
		// Comma separate
		let sets = inputColors.split(',');
		sets = sets.map((s) => s.trim());
		let last = sets[sets.length - 1];

		// Nothing to do
		if (!last || !colorsIndex) {
			suggestions = [];
			suggestionSelected = null;
			return;
		}

		// Reset if different
		if (last !== recentSearch) {
			suggestions = [];
			suggestionSelected = null;
		}

		// Do search
		let search = colorsIndex.search(last);
		suggestions = search
			.sort((a, b) => a.score - b.score)
			.slice(0, 50)
			.map((s) => s.item);

		recentSearch = last;
	}
	const suggestColors = debounce(suggestColorsSimple, 250);

	// Add a color (via click)
	function addColorSuggestion(color) {
		// Determine how many colors we have in our input
		let sets = inputColors.split(',');
		sets = sets.map((s) => s.trim());

		// Add last
		sets[sets.length - 1] = `${color}, `;

		inputColors = sets.join(', ');
	}

	// Add a color (via keyboard)
	function addSelectedColorSuggestion(event) {
		if (!suggestions || !suggestions.length || !suggestions[suggestionSelected]) {
			return;
		}

		addColorSuggestion(suggestions[suggestionSelected].name);
	}

	// Move selection down list
	function suggestionSelectedDown() {
		if (!suggestions || !suggestions.length) {
			return;
		}

		suggestionSelected =
			suggestionSelected === null
				? 0
				: suggestionSelected === suggestions.length - 1
				  ? 0
				  : suggestionSelected + 1;
	}

	// Move selection up list
	function suggestionSelectedUp() {
		if (!suggestions || !suggestions.length) {
			return;
		}

		suggestionSelected =
			suggestionSelected === null
				? suggestions.length - 1
				: suggestionSelected === 0
				  ? suggestions.length - 1
				  : suggestionSelected - 1;
	}

	// Key on input
	function inputKey(event) {
		// Handle moving up and down menu.
		// TODO: Ideally pressing up would not get you to the beginning of the
		// input, but preventDefault doesn't seem to halt that.
		if (event && event.key === 'ArrowDown') {
			suggestionSelectedDown();
		} else if (event && event.key === 'ArrowUp') {
			suggestionSelectedUp();
		}

		// Select an option with space
		if (event && event.key === ' ') {
			addSelectedColorSuggestion();
		}

		// Close on tab
		if (event && event.key === 'Tab') {
			closeSuggestions();
		}
	}

	// Key on suggestions
	function suggestionKey() {
		// ??
	}

	// Close suggestions
	function closeSuggestions() {
		suggestions = [];
	}
</script>

<div
	class="container {hasSuggestions ? `position-${suggestionsPosition}` : ''}"
	class:has-suggestions={hasSuggestions}
>
	<input
		{id}
		type="text"
		placeholder="Change lights"
		autocomplete="off"
		aria-describedby="{id}-help"
		aria-controls="{id}-suggestions"
		aria-autocomplete="list"
		aria-expanded={hasSuggestions ? 'true' : 'false'}
		role="combobox"
		bind:value={inputColors}
		on:input={suggestColors}
		on:keydown={inputKey}
		on:focus={suggestColors}
	/>

	{#if hasSuggestions}
		<div id="{id}-suggestions" class="suggestions" role="listbox">
			<div aria-live="polite" role="status" class="sr-only">
				{suggestions.length} suggestions available.
			</div>

			{#each suggestions as suggestion, sIndex (suggestion.id)}
				<ul role="button" on:click={addColorSuggestion(suggestion.name)} on:keyup={suggestionKey}>
					<li
						role="option"
						tabindex="-1"
						aria-selected={suggestionSelected === sIndex ? 'true' : 'false'}
					>
						<span>{suggestion.name}</span>
						<ul class="swatches">
							{#each suggestion.colors as color}
								<li
									style:background-color={color}
									style:color={chroma(color).alpha(0.5).css()}
									style:border-color={color === '#FFFFFF'
										? '#E1E1E1'
										: chroma(color).brighten(0.5).css()}
								></li>
							{/each}
						</ul>
					</li>
				</ul>
			{/each}
		</div>
	{/if}
</div>

<style>
	.container {
		width: 100%;
		position: relative;
		margin-right: 1rem;
	}

	input[type='text'] {
		width: calc(100% - 1rem);
		margin: 0;
	}

	.position-bottom input[type='text'] {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.suggestions {
		background-color: var(--color-white);
		color: var(--color-black);
		position: absolute;
		width: 100%;
		max-height: calc(75vh - 2rem);
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}

	@media screen and (min-width: 850px) {
		.suggestions {
			max-height: calc(45vh - 2rem);
		}
	}

	.position-bottom .suggestions {
		border-bottom-left-radius: var(--border-radius);
		border-bottom-right-radius: var(--border-radius);
	}

	.suggestions > ul {
		margin: 0;
		padding: 0;
	}

	.suggestions > ul > li {
		margin: 0;
		padding: 0.5rem;
		display: block;
		border-bottom: 1px solid var(--color-gray);
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: all 0.5s ease-in-out;
	}

	.suggestions > ul > li:hover,
	.suggestions > ul > li[aria-selected='true'] {
		background-color: var(--color-black);
		color: var(--color-white);
		cursor: pointer;
	}

	.suggestions > ul > li span {
		font-size: 0.85em;
		vertical-align: middle;
		display: inline-block;
	}

	.swatches {
		margin: 0;
		padding: 0;
		text-align: right;
		margin-left: 1rem;
	}

	.swatches li {
		display: inline-block;
		height: 0.75rem;
		width: 0.75rem;
		border-radius: 50%;
		margin-left: 0.25rem;
		vertical-align: middle;
		border: 1px solid transparent;
		box-shadow: 0 0 2px 2px;
	}

	@media screen and (min-width: 750px) {
		.swatches li {
			height: 1rem;
			width: 1rem;
			margin-left: 0.75rem;
			border: 2px solid transparent;
			box-shadow: 0 0 4px 4px;
		}
	}
</style>
