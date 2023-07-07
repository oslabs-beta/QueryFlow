<script>
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { max } from 'd3-array';
	import { metricData, userInfoStore } from '../store';
	import AxisX from './graphComponents/AxisX.svelte';
	import AxisY from './graphComponents/AxisY.svelte';
	import TooltipBell from './graphComponents/TooltipBell.svelte';
	import { navigate } from 'svelte-routing';
  import RedisForm from '../lib/RedisForm.svelte'

	$: metrics = [];


	metricData.subscribe((data) => {
		metrics = data;
		console.log('metrics data: ', metrics)
	});

	const sampleData = [];
	// generate sample data
	for (let i = 0; i < 100; i++) {
		sampleData.push({ averagetime: Math.random() * 200 });
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
	// calculate buckets dynamically 
	const buckets = metrics.length >= 4 ? Math.ceil(Math.log2(metrics.length - 3) * 1.7) : 2
	// format data
	const bellCurveData = format(metrics, buckets);
	console.log(bellCurveData.at(-1));

	let width = 600;
	let height = 600;

	const margin = { top: 20, right: 40, left: 40, bottom: 25 };

	const xScale = scaleBand()
		.domain(bellCurveData.map((_, i) => `${i}`))
		.range([margin.left, width - margin.right])
		.padding(0.1);

	const yScale = scaleLinear()
		.domain([0, max(bellCurveData, (d) => d.NumberOfQueries)])
		.range([height - margin.top - margin.bottom, 0]);

	let hoveredData;
</script>

<!-- TEMPORARY BUTTON FOR GOING TO /home -->
<button
	on:click={() => {
		navigate('/home');
	}}
	type="button"
	class=" mt-2 ml-2 text-primary border-2 border border-primary hover:bg-secondary hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center dark:border-primary dark:text-primary dark:hover:text-primary dark:focus:ring-blue-800 dark:hover:bg-white"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		stroke="currentColor"
		viewBox="0 0 24 24"
		stroke-width="2"
		class="w-6 h-6"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
		/>
	</svg>
</button>
<!-- END OF TEMPORARY BUTTON -->

<div
	class="chart-container"
	bind:clientWidth={width}
	on:mouseleave={() => {
		hoveredData = null;
	}}
>
<div class="flex justify-center ">
	<h1 class="title">Average query times</h1>
  <button class="btn ml-4" onclick="my_modal_2.showModal()">Get Redis Metrics</button>
<dialog id="my_modal_2" class="modal text-primary">
  <form method="dialog" class="modal-box">
    <RedisForm/>
  </form>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
</div>
	<svg {width} {height}>
		<AxisX {bellCurveData} {height} {xScale} {margin} />
		<AxisY {bellCurveData} {width} {yScale} {margin} />
		<g class="bars">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			{#each bellCurveData as data, i}
				<rect
					x={xScale(`${i}`)}
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
