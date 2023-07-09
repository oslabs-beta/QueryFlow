
<script lang="ts">
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { max } from 'd3-array';
	import { metricData, userInfoStore } from '../store';
	import type { QueryData, WorkingArr, Directions } from '../types';
	import type { ScaleBand, ScaleLinear } from 'd3';
	import AxisX from './graphComponents/AxisX.svelte';
	import AxisY from './graphComponents/AxisY.svelte';
	import Tooltip from './graphComponents/Tooltip.svelte';
	import { navigate } from 'svelte-routing';
  import RedisForm from '../lib/RedisForm.svelte'
  import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte'
  //reactive metrics array 
	$: metrics = [];

	metricData.subscribe((data: QueryData[]) => {
		metrics = data;
	});
  
  let formModal:boolean = false;

	// declaring optional params for later defining array workingArr with proper keys in obj elements
	// data conversion for bar chart
	const format: Function = (data: QueryData[], buckets: number): WorkingArr[] => {
		// create return workingArr with n buckets
		const workingArr: WorkingArr[] = [];
		// find range of values
		const highVal = data.reduce((acc: number, obj: QueryData) => Math.max(obj.averageTime, acc), 0);
		// divide range by buckets
		for (let i = 0; i < buckets; i++) {
			workingArr.push({});
			workingArr[i].topValue = Math.ceil(((i + 1) * highVal) / buckets);
			workingArr[i].bottomValue = workingArr[i - 1] ? workingArr[i - 1].topValue : 0;
			workingArr[i].numberOfQueries = 0;
		}

		// loop through data, add each value to numberOfQueries
		for (const dataPoint of data) {
			for (let i = 0; i < workingArr.length; i++) {
				if (workingArr[i].topValue >= dataPoint.averageTime) {
					workingArr[i].numberOfQueries += 1;
					break;
				}
			}
		}
		return workingArr;
	};
	// calculating buckets dynamically to limit number of buckets with smaller/larger data sizes
	let buckets = metrics.length >= 4 ? Math.ceil(Math.log2(metrics.length - 3) * 1.7) : 2;
	if (!metrics.length) buckets = 0;
 
	// formatting data
	const barChartData: WorkingArr[] = format(metrics, buckets);

	let width: number = 600;
	let height: number = 600;

	// declaring directions interface for margin obj

	const margin: Directions = { top: 20, right: 40, left: 40, bottom: 25 };

	const xScale: ScaleBand<string> = scaleBand()
		.domain(barChartData.map((_, i) => `${i}`))
		.range([margin.left, width - margin.right])
		.padding(0.1);

	const yScale: ScaleLinear<number, number> = scaleLinear()
		.domain([0, max(barChartData, (d) => d.numberOfQueries)])
		.range([height - margin.top - margin.bottom, 0]);

	let hoveredData: WorkingArr;
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

<!-- render chart if queries exist -->
<!-- {#if buckets} -->

<div
	class="chart-container"
	bind:clientWidth={width}
	on:mouseleave={() => {
		hoveredData = null;
	}}
>

<div class="flex justify-center ">
	<h1 class="title">Average query times</h1>
	<!-- 'onclick' below needs to be looked at later -->
  <button class="btn ml-4" on:click={() => formModal = true}>Get Redis Metrics</button>
  <Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" action="#">
      <RedisForm/>
    </form>
  </Modal>
</div>
	<svg {width} {height}>
		<AxisX {barChartData} {height} {xScale} {margin} />
		<AxisY {barChartData} {width} {yScale} {margin} />
		<g class="bars">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			{#each barChartData as data, i}
				<rect
					x={xScale(`${i}`)}
					y={yScale(data.numberOfQueries)}
					width={xScale.bandwidth()}
					height={height - margin.top - margin.bottom - yScale(data.numberOfQueries)}
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
		<Tooltip data={hoveredData} {xScale} {yScale} />
	{/if}
</div>
<!-- {/if} -->
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
