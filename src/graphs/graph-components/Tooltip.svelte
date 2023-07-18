<script lang="ts">
	import type { WorkingArr } from "../../types";
	import type { ScaleBand, ScaleLinear } from "d3";

	// drilled in from AllMetrics.svelte
	export let data: WorkingArr;
	export let xScale: ScaleBand<string>;
	export let yScale: ScaleLinear<number, number>;
</script>


<div
	class="tooltip"
	style="position: absolute;
    top: {yScale(data.numberOfQueries)}px;
    left: {xScale(`${data}`)}px"
>
	<h1>Number of queries</h1>
	<p>{data.numberOfQueries}</p>

	<h1>Average time</h1>
	<p>{data.bottomValue} - {data.topValue} ms</p>
</div>

<style>
	.tooltip {
		padding: 6px;
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.5);
		pointer-events: none;
		transition: top 300ms ease, left 300ms ease;
	}

	h1 {
		color: black;
		font-weight: 700;
		margin-bottom: 0.25rem;
	}

	p {
		color: black;
	}
</style>
