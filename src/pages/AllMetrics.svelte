<script lang="ts">
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { max } from 'd3-array';
	import { metricData } from '../store';
	import type { QueryData, WorkingArr, Directions } from '../types';
	import type { ScaleBand, ScaleLinear } from 'd3';
	import { navigate } from 'svelte-routing';
	import RedisForm from '../lib/RedisForm.svelte';
	import { Modal } from 'flowbite-svelte';
  import { onMount,tick } from 'svelte';
	// reactive metrics array
	$: metrics = [];
	
	metricData.subscribe((data: QueryData[]) => {
		metrics = data;
		console.log(metrics)
	});

	let formModal: boolean = false;


	// format data
  let data = metrics.sort((a, b) => a.averageTime - b.averageTime).map((el, i) => {
		return {queryName: el.queryName.concat(i > 0 ? `-${i}` : ""), averageTime: el.averageTime}
	})

  let tooltipContent = "";
  let tooltipX = 0;
  let tooltipY = 0;
  let showTooltip = false;

  let textNode;  // reference to the text node
  let rectWidth = 0;  // will store the width of the rectangle

  function handleMouseOver(d, event) {
    showTooltip = true;
    tooltipContent = `Query: ${d.queryName} - Time: ${d.averageTime}`;
    tooltipX = xScale(d.averageTime) + 10;  // Positioning the tooltip to the right of the bar
    tooltipY = yScale(d.queryName) + yScale.bandwidth() / 2;

    // Request an update after changing tooltipContent
    tick().then(() => {
      if (textNode) {
        const bbox = textNode.getBBox();
        rectWidth = bbox.width + 10;  // add some padding
      }
    });
  }

  function handleMouseOut() {
    showTooltip = false;
  }
let width:any, height:any;
	const margin = { top: 20, right: 20, bottom: 20, left: 180 };

	onMount(() => {
		const resize = () => {
			const container = document.querySelector(".h-full.w-full");
			width = container.clientWidth;
			height = container.clientHeight;
		}
		window.addEventListener('resize', resize);
		resize();

		return () => {
			window.removeEventListener('resize', resize);
		};
	});


	$: if (width && height) {
		const innerHeight = height - margin.top - margin.bottom ;
		const innerWidth = width - margin.left - margin.right;

		yScale.range([0, innerHeight]);
		xScale.range([0, innerWidth]);
	}

	$: xDomain = data.map((d) => d.queryName);
	$: yDomain = data.map((d) => +d.averageTime);

	$: yScale = scaleBand().domain(xDomain).range([0, height]).padding(0.1);
	$: xScale = scaleLinear().domain([0, Math.max.apply(null, yDomain)]).range([0, width]);
  $: innerHeight = height - margin.top - margin.bottom ;
</script>

<!-- button to return to home page -->
<button
	on:click={() => {
		navigate('/home');
	}}
	type="button"
	class="mt-2 ml-2 text-primary border-2 border border-primary hover:bg-secondary hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center dark:border-primary dark:text-primary dark:hover:text-primary dark:focus:ring-blue-800 dark:hover:bg-white">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		stroke="currentColor"
		viewBox="0 0 24 24"
		stroke-width="2"
		class="w-6 h-6">
		<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
	</svg>
</button>
<div class="flex justify-center mb-8">
  <h1 class="title">Average Query Times</h1>

  <!-- 'on:click' below needs to be looked at later -->
  <button class="btn btn-primary text-base ml-4" on:click={() => (formModal = true)}>Get Redis Metrics</button>
  <Modal bind:open={formModal} size="sm" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6">
      <RedisForm />
    </form>
  </Modal>
</div>




<!-- render chart -->
<div class="h-full w-full flex space-start" style="aspect-ratio: 16/9;">
  <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" class="h-full w-full all-metrics">
    <g transform={`translate(${margin.left},${margin.top})`}>
      <!-- ... your xScale ticks and other elements ... -->
      {#each xScale.ticks() as tickValue}
			<g transform={`translate(${xScale(tickValue)},0)`}>
				<line y1="0" y2={innerHeight} stroke="black" />
				<text text-anchor="middle" dy=".71em" y={innerHeight + 3}>
					{tickValue}
				</text>
			</g>
		{/each}
        
    {#each data as d}
        <text text-anchor="end" x="-3" dy=".32em" y={yScale(d.queryName) + yScale.bandwidth() / 2}>
          {d.queryName}
        </text>
        <rect 
          x="0" 
          y={yScale(d.queryName)} 
          width={xScale(d.averageTime)} 
          height={yScale.bandwidth()} 
          style="fill: teal;" 
          tabindex="0" 
          on:mouseover={() => handleMouseOver(d, event)}
          on:mouseout={handleMouseOut}
          on:focus={() => handleMouseOver(d, event)} 
          on:blur={handleMouseOut}  
        />
      {/each}

      {#if showTooltip}
        <rect 
          x={tooltipX} 
          y={tooltipY - 15}
          width={rectWidth}
          height="30"
          fill="gray"
        />
        <text 
          bind:this={textNode} 
          x={tooltipX + rectWidth / 2} 
          y={tooltipY} 
          class="tooltip2" 
          text-anchor="middle">
          {tooltipContent}
        </text>
  {/if}
    </g>
  </svg>
</div>
  <style>
    .all-metrics {
		display: block;
		width: 90vw;
		height: auto;
	}

  .tooltip2 {
    background-color: gray;
    border: 1px solid white;
    padding: 5px;
    width:80px;
    pointer-events: none;
  }
  </style>