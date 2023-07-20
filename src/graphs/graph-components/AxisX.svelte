<!-- <script lang="ts">
	import type { ScaleBand } from "d3";
	import type { Directions, WorkingArr } from "../../types";
	import { ticks } from "d3-array";

	// drilled in from AllMetrics.svelte
	export let barChartData: WorkingArr[];
	export let height: number;
	export let xScale: ScaleBand<string>;
	export let margin: Directions;

	// dynamically creates ticks along the x-axis
	const numTicks = 5; // Number of ticks desired

	let xTicks: number[] = [];
	if (barChartData.length > 1) {
		xTicks = ticks(0, barChartData.length - 1, numTicks);
	}
</script>

<g>
	{#each xTicks as tick}
		<text x={xScale(`${tick}`) + 15 +xScale.bandwidth() / 2} y={height - margin.bottom-10} dy="6" dominant-baseline="hanging">
			{barChartData[tick].topValue} ms
		</text>
	{/each}
</g> -->

<script lang="ts">
  import type { ScaleBand } from "d3";
  import type { Directions, WorkingArr } from "../../types";

  // drilled in from AllMetrics.svelte
  export let barChartData: WorkingArr[];
  export let height: number;
  export let xScale: ScaleBand<string>;
  export let margin: Directions;

  // dynamically creates ticks along the x-axis
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
		<text x={xScale(`${tick}`) + 15 +xScale.bandwidth() / 2} y={height - margin.bottom-10} dy="6" dominant-baseline="hanging">
			{barChartData[tick].topValue} ms
		</text>
	{/each}
</g>