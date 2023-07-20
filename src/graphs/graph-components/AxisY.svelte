<script lang="ts">
	import type { ScaleLinear } from 'd3';
	import type { Directions, WorkingArr } from '../../types';
	import { max } from 'd3-array';

	// drilled in from AllMetrics.svelte
	export let barChartData: WorkingArr[];
	export let width: number;
	export let yScale: ScaleLinear<number, number>;
	export let margin: Directions;

	// calculates the proper Y ticks to create
	const calculateTicks: Function = (ticksAmount: number): number[] => {
		const maxValue: number = max(barChartData, (d) => d.numberOfQueries);
		const returnArr: number[] = [];
		for (let i = 0; i < ticksAmount; i++) {
			returnArr.push(Math.round((i * Number(maxValue)) / (ticksAmount - 1)));
		}
		return returnArr;
	};

	// calling the function, sets to var
	let yTicks: number[] = calculateTicks(4);
</script>

<g transform="translate({margin.left} {margin.top})">
	{#each yTicks as tick}
		<text x={-15} y={yScale(tick)} dy="-6">{tick}</text>
		<line
			x1="-15"
			y1={yScale(tick) - 20}
			x2={width}
			y2={yScale(tick) - 20}
			stroke={tick == 0 ? 'black' : '#cecece'}
		/>
	{/each}
</g>
