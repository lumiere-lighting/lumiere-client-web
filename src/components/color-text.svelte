<script>
	import { spreadColors } from '../lib/utils';

	export let color;
	$: spread =
		color && color.colors ? spreadColors(color.colors, color.name.length, color.id, 1) : null;
</script>

<span class="color-text">
	{#if spread}
		{#each spread as c, ci}
			{#if color.name[ci] === ' '}
				<span style="text-decoration: underline; text-decoration-color: {c};">
					{color.name[ci]}
				</span>
			{:else}
				<span style="color: {c};">{color.name[ci]}</span>
			{/if}
		{/each}
	{:else}
		{color.name}
	{/if}
</span>
