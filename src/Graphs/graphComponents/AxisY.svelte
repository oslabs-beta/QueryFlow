<script>
	export let height;
	export let width;
	export let yScale;
	export let margin;

	let yTicks = [0, 25, 50, 75];
</script>

<g transform="translate({margin.left} {margin.top})">
	{#each yTicks as tick}
		<text x={0} y={yScale(tick)} dy="-6">{tick} {tick == 60 ? ' time in ms' : ''}</text>
		<line
			x1="0"
			y1={yScale(tick)}
			x2={width}
			y2={yScale(tick)}
			stroke={tick == 0 ? 'black' : '#cecece'}
		/>
	{/each}
</g>
