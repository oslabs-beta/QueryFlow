<script lang="ts">
	import type { ScaleBand } from "d3";
	import type { Directions, WorkingArr } from "../../types";

	export let height: number;
	export let xScale: ScaleBand<string>;
	export let margin: Directions;
	export let barChartData: WorkingArr[];

	// Dynamically creates ticks along the x-axis
	let xTicks: number[] = [
		0,
		Math.ceil(((barChartData.length - 1) * 1) / 4),
		Math.ceil(((barChartData.length - 1) * 1) / 2),
		Math.ceil(((barChartData.length - 1) * 3) / 4),
		Math.ceil(barChartData.length - 1),
	];
</script>

<g>
	{#each xTicks as tick}
		<text x={xScale(`${tick}`)} y={height - margin.bottom} dy="6" dominant-baseline="hanging"
			>{tick ? barChartData[tick].topValue : 0} ms</text
		>
	{/each}
</g>
