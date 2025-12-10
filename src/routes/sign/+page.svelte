<script>
	import '../../app.css';

	const examples = [
		['Red', ['red']],
		['Christmas', ['red', 'white', 'green']],
		['Hanukkah', ['rgb(192, 192, 192)', 'rgb(0, 0, 255)']],
		['Strawberry', ['rgb(252, 90, 141)']],
		['Purple Pizzazz', ['#FF00CC']],
		['Robins Egg Blue', ['#00CCCC']],
		['Screamin Green', ['#76FF7A']],
		['Pikachu', ['rgb(242, 206, 61)', 'rgb(161, 77, 7)']],
		['Venusaur', ['#d66954', '#3db58e', '#14362d', '#147c6c', '#a5e28b']],
		// ['Lions', ['#005A8B', '#B0B7BC']],
		// ['Pistons', ['#ed174c', '#006bb6', '#0f586c']],
		// ['Red Wings', ['#c8102e', '#ffffff']],
		// ['Tigers', ['#0C2C56']],
		// ['Old School Tigers', ['#041E5E', '#f64b13']],
		// ['Spartans', ['#FFFFFF', '#1C453A']],
		// ['Wolverines', ['#FFFFFF', '#FAC417', '#272341']],
		['USA', ['#B22234', '#FFFFFF', '#3C3B6E']],
		['Switzerland', ['#FF0000', '#FFFFFF']],
		['Rainbow', ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']]
	];
</script>

<svelte:head>
	<title>Sign | Community Lighting</title>
</svelte:head>

<div class="page-container">
	<header>
		<h1>Change our lights</h1>
	</header>

	<main>
		<p class="action">
			<span class="label">VISIT</span>
			<span class="value">lumiere.lighting</span>
		</p>

		<p class="action">
			<span class="label">or TEXT</span>
			<span class="value">(123) 456-7890</span>
		</p>

		<p class="examples-label">
			There are over <strong>30k terms</strong> to choose from so be creative! Here's just a small sample:
		</p>

		<ul class="examples">
			{#each examples as example}
				<li>
					<span class="example">
						{example[0]}
						<span class="example-colors">
							{#each example[1] as color}
								<span
									class="color"
									style="background-color: {color}; width: {100 / example[1].length}%"
								></span>
							{/each}
						</span>
					</span>
				</li>
			{/each}
		</ul>
	</main>

	<footer />
</div>

<style>
	:global(body) {
		background-color: white;
		color: var(--color-bg);
		font-size: 24px;
	}

	.page-container {
		padding: 1rem;
		text-align: center;
	}

	h1 {
		margin-bottom: 3rem;
		text-transform: uppercase;
		background-color: var(--color-bg);
		color: var(--color-text);
		padding: 1rem 1.5rem;
		border-radius: 3rem;
		display: inline-block;
	}

	.action {
		margin-bottom: 4rem;

		.label {
			font-weight: bold;
			display: block;
		}

		.value {
			font-size: 4rem;
		}
	}

	.examples-label {
		padding-top: 1rem;
		border-top: 3px solid var(--color-bg);
		margin-top: 3rem;
		margin-bottom: 3rem;
		max-width: 40rem;
		margin-left: auto;
		margin-right: auto;
	}

	.examples {
		list-style: none;

		li {
			list-style: none;
			display: inline-block;
			padding: 0;
			margin: 0 1rem 1rem 0;
		}

		.example {
			display: inline-block;
			position: relative;
		}

		.example-colors {
			width: 100%;
			display: flex;
		}

		.color {
			display: block;
			height: 0.85rem;
		}
	}
</style>
