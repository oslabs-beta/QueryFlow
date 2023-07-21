<script lang="ts">
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { metricData} from '../store';
	import type { QueryData} from '../types';
	import { navigate } from 'svelte-routing';
	import RedisForm from '../lib/RedisForm.svelte';
	import { Modal } from 'flowbite-svelte';
  import { onMount,tick } from 'svelte';
  import { get } from 'svelte/store';
	// reactive metrics array
	$: metrics = [];
	
	metricData.subscribe((data: QueryData[]) => {
		metrics = data;
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

  let textNode:any;  // reference to the text node
  let rectWidth = 0;  // will store the width of the rectangle
  function handleMouseOver(d:any) {
    showTooltip = true;
    tooltipContent = `Query: ${d.queryName} - Time: ${d.averageTime}`;
    tooltipX = xScale(d.averageTime) / 2; // Center the tooltip relative to the bar
    tooltipY = yScale(d.queryName) - 20;  // Position it above the bar

    // Request an update after changing tooltipContent
    tick().then(() => {
      if (textNode) {
        const bbox = textNode.getBBox();
        rectWidth = bbox.width + 10;  // Add some padding
        tooltipX -= rectWidth / 2;    // Adjust the position considering the rectangle width
      }
    });
  }

  function handleMouseOut() {
    showTooltip = false;
  }

  let width:any=0, height:any=0;
	const margin = { top: 20, right: 20, bottom: 20, left: 180 };


	onMount(() => {
    const container = document.querySelector(".h-full.w-full");
    width = container.clientWidth;
    height = container.clientHeight;
    
    const allMetrics: QueryData[] = get(metricData);
    if(allMetrics.length===0){
      alert('You are going to home, to get your data')
      navigate('/home')
    }

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

  $: innerHeight = height - margin.top - margin.bottom ;
  $: barPadding = data.length < 5 ? 0.5 : 0.1; // Adjust these numbers as needed
	$: xDomain = data.map((d) => d.queryName);
	$: yDomain = data.map((d) => +d.averageTime);

	$: yScale = scaleBand().domain(xDomain).range([0, height]).padding(barPadding);
	$: xScale = scaleLinear().domain([0, Math.max.apply(null, yDomain)]).range([0, width]);
  $: if (width && height) {
    const innerHeight = height - margin.top - margin.bottom;
    yScale.range([0, innerHeight]);
    xScale.range([0, innerWidth]);
}

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
<div class="flex items-center justify-center mb-8">
  <h1 class="title text-xl">Average Query Times</h1>

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
  {#if width && height}
  <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" class="h-full w-full all-metrics">
    <g transform={`translate(0,${innerHeight})`}>
      <text transform={`translate(${width / 2},${margin.bottom + 40})`} class="text-xl font-medium" text-anchor="middle">milliseconds</text>
    </g>
    <g transform={`translate(${margin.left},${margin.top})`}>
      <!-- ... (the same as the previous code for xScale ticks) ... -->
      {#each xScale.ticks() as tickValue}
			<g transform={`translate(${xScale(tickValue)},0)`}>
				<line y1="0" y2={innerHeight} stroke="black" />
				<text text-anchor="middle" dy=".71em" y={innerHeight + 3}>
					{tickValue}
				</text>
			</g>
		{/each}
      {#each data as d}
        <text class="text-xs md:text-sm lg:text-sm" text-anchor="end" x="-3" dy=".32em" y={yScale(d.queryName) + yScale.bandwidth() / 2}>
          {d.queryName}
        </text>
        <rect 
          x="0" 
          y={yScale(d.queryName)} 
          width={xScale(d.averageTime)} 
          height={yScale.bandwidth()} 
          style="fill: teal;" 
          tabindex="0" 
          on:mouseover={() => handleMouseOver(d)}
          on:mouseout={handleMouseOut}
          on:focus={() => handleMouseOver(d)} 
          on:blur={handleMouseOut}  
        />
      {/each} 
      {#if showTooltip}
      <rect 
      x={tooltipX} 
      y={tooltipY +30}
      width={rectWidth}
      height="30"
      fill="gray"
      class="tooltip-rect"  
    />
        <text 
          bind:this={textNode} 
          x={tooltipX + rectWidth / 2} 
          y={tooltipY + 50} 
          class="tooltip2" 
          text-anchor="middle">
          {tooltipContent}
        </text>
      {/if}    
    </g>
  </svg>
  {/if}
</div>
  <style>
    .all-metrics {
    display: block;
    width: 90vw;
    height: auto;
  }

  .tooltip2 {
    fill: white;
    font-size: 0.8em;
    font-weight: bold;
    pointer-events: none;  
    transition: opacity 0.2s ease-in-out;
    z-index: 1000;
  }

  .tooltip-rect {
    pointer-events: none;  
  }
  </style>