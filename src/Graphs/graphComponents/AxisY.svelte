<script>
	export let width;
	export let yScale;
	export let margin;
	export let bellCurveData;
	import { max } from 'd3-array';

	// function to
	const calculateXTicks = (ticksAmount) => {
		// find max value
		const maxValue = max(bellCurveData, (d) => d.NumberOfQueries);
		// build array
		const returnArr = [];
		for (let i = 0; i < ticksAmount; i++) {
			returnArr.push(Math.round((i * Number(maxValue)) / (ticksAmount - 1)));
		}
		return returnArr;
	};

	let yTicks = calculateXTicks(4);
</script>

<g transform="translate({margin.left} {margin.top})">
	{#each yTicks as tick}
		<text x={-15} y={yScale(tick)} dy="-6">{tick} {tick == yTicks.at(-1) ? ' number of queries' : ''}</text>
		<line
			x1="-15"
			y1={yScale(tick)}
			x2={width}
			y2={yScale(tick)}
			stroke={tick == 0 ? 'black' : '#cecece'}
		/>
	{/each}
</g>
