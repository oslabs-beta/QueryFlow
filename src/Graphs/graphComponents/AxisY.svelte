<script>
	export let height;
	export let width;
	export let yScale;
	export let margin;
	export let bellCurveData;
	import { max } from 'd3-array';

	// function to
	const calculateXTicks = (ticksAmount) => {
		// find max value
		const maxValue = max(bellCurveData, (d) => d.NumberOfQueries);
		console.log(typeof maxValue);
		// build array
		const returnArr = [];
		for (let i = 0; i < ticksAmount; i++) {
			returnArr.push(Math.ceil((i * Number(maxValue)) / (ticksAmount - 1)));
		}
		return returnArr;
	};
	console.log("This is calculateXTicks's response: ", calculateXTicks(4));

	let yTicks = calculateXTicks(5);
</script>

<g transform="translate({margin.left} {margin.top})">
	{#each yTicks as tick}
		<text x={0} y={yScale(tick)} dy="-6">{tick} {tick == 60 ? ' number of queries' : ''}</text>
		<line
			x1="0"
			y1={yScale(tick)}
			x2={width}
			y2={yScale(tick)}
			stroke={tick == 0 ? 'black' : '#cecece'}
		/>
	{/each}
</g>
