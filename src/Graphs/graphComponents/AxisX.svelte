<script>
	export let height;
	export let xScale;
	export let margin;
	export let bellCurveData;

	let xTicks = [
		0,
		Math.ceil(((bellCurveData.length - 1) * 1) / 4),
		Math.ceil(((bellCurveData.length - 1) * 1) / 2),
		Math.ceil(((bellCurveData.length - 1) * 3) / 4),
		Math.ceil(bellCurveData.length - 1),
	];
</script>

<g>
	{#each xTicks as tick}
		<text x={xScale(`${tick}`)} y={height - margin.bottom} dy="6" dominant-baseline="hanging"
			>{tick ? bellCurveData[tick].topValue : 0}ms</text
		>
	{/each}
</g>
