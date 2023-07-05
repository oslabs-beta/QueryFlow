<script>
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { max } from 'd3-array';
	import { metricData } from '../store';

	export let XAxisData;
	export let YAxisData;

	$: metrics = [];

	metricData.subscribe((data) => {
		metrics = data;
	});

	const sampleData = [];

	// generate sample data
	for (let i = 0; i < 100; i++) {
		sampleData.push({ averagetime: Math.random() * 50 });
	}

	// data conversion to bell curve
	const format = (data, buckets) => {
		// create return workingArr with n buckets
		const workingArr = Array(buckets);
		// find range of values
		const highVal = data.reduce((accum, obj) => Math.max(obj.averagetime, accum), 0);
		// divide range by buckets
		for (let i = 0; i < buckets; i++) {
			workingArr[i] = {};
			workingArr[i].topValue = Math.ceil(((i + 1) * highVal) / buckets);
			workingArr[i].bottomValue = workingArr[i - 1] ? workingArr[i - 1].topValue : 0;
			workingArr[i].NumberOfQueries = 0;
		}

		// loop through data, add each value to NumberOfQueries
		for (const dataPoint of data) {
			for (let i = 0; i < workingArr.length; i++) {
				if (workingArr[i].topValue >= dataPoint.averagetime) {
					workingArr[i].NumberOfQueries += 1;
					break;
				}
			}
		}
		// return workingArr
		return workingArr;
	};
	const bellCurveData = format(sampleData, 20);
	console.log(bellCurveData);

	let width = 600;
	let height = 600;

	const margin = { top: 20, right: 40, left: 40, bottom: 20 };

	const xScale = scaleBand()
		.domain(bellCurveData.map((_, i) => i))
		.range([margin.left, width - margin.right])
		.padding(0.1);

	const yScale = scaleLinear()
		.domain([0, max(bellCurveData, (d) => d.NumberOfQueries)])
		.range([height - margin.top - margin.bottom, 0]);

	import AxisX from './graphComponents/AxisX.svelte';
	import AxisY from './graphComponents/AxisY.svelte';
	import TooltipBell from './graphComponents/TooltipBell.svelte';

	let hoveredData;
</script>

<div
	class="chart-container"
	bind:clientWidth={width}
	on:mouseleave={() => {
		hoveredData = null;
	}}
>
	<h1 class="title">Average query times</h1>
	<svg {width} {height}>
		<AxisX {height} {xScale} {margin} />
		<AxisY {height} {width} {yScale} {margin} />
		<g class="bars">
			{#each bellCurveData as data, i}
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<rect
					x={xScale(i)}
					y={yScale(data.NumberOfQueries)}
					width={xScale.bandwidth()}
					height={height - margin.top - margin.bottom - yScale(data.NumberOfQueries)}
					fill={hoveredData && hoveredData == data ? 'purple' : 'steelblue'}
					opacity={hoveredData ? (hoveredData == data ? '1' : '.3') : '1'}
					stroke="black"
					on:mouseover={() => {
						hoveredData = data;
					}}
					on:focus={() => {
						hoveredData = data;
					}}
					tabindex="0"
				/>
			{/each}
		</g>
	</svg>
	{#if hoveredData}
		<TooltipBell data={hoveredData} {xScale} {yScale} />
	{/if}
</div>

<style>
	.title {
		display: flex;
		justify-content: center;
	}

	rect {
		transition: opacity 300ms ease;
		cursor: pointer;
	}

	rect:focus {
		outline: none;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}
</style>
