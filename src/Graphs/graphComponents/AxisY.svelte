<script lang="ts">
	import type { ScaleLinear } from 'd3';
	import type { Directions, WorkingArr } from '../../types';
	import { max } from 'd3-array';

	export let width: number;
	export let yScale: ScaleLinear<number, number>;
	export let margin: Directions;
	export let barChartData: WorkingArr[];

	// function to
	const calculateXTicks: Function = (ticksAmount: number): number[] => {
		// find max value
		const maxValue: number = max(barChartData, (d) => d.numberOfQueries);
		// build array
		const returnArr: number[] = [];
		for (let i = 0; i < ticksAmount; i++) {
			returnArr.push(Math.round((i * Number(maxValue)) / (ticksAmount - 1)));
		}
		return returnArr;
	};

	let yTicks: number[] = calculateXTicks(4);
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
