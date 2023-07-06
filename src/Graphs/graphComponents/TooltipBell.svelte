<script>
	export let data;
	export let xScale;
	export let yScale;

	// $: console.log(xScale(data.grade));
</script>

<div
	class="tooltip"
	style="position: absolute;
    top: {yScale(data.NumberOfQueries)}px;
    left: {xScale(data)}px"
>
	<h1>number of queries</h1>
	<p>{data.NumberOfQueries}</p>

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
