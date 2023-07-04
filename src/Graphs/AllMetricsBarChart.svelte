<script>
  import { scaleBand, scaleLinear } from 'd3-scale';
  import { max } from 'd3-array';
  import { metricData } from '../store';
  
  export let metrics = [];
  
  metricData.subscribe(data => {
    metrics = data;
  });
  
  console.log(metrics);
  
  const sampleData = [
    { averagetime: 3 },
    { averagetime: 8 },
    { averagetime: 2 },
    { averagetime: 4 },
    { averagetime: 15 },
    { averagetime: 7 },
    { averagetime: 8 },
    { averagetime: 5 },
    { averagetime: 4 },
		{ averagetime: 5 }
  ];
	
	// data conversion
  const buckets = 8
  const rangeX = max(sampleData, (d) => d.averagetime)
	const convertedData = sampleData.map(() => {
		// make buckets 
	})


  

  let width = 600;
  let height = 600;

  const margin = { top: 20, right: 40, left: 40, bottom: 20 };

  const xScale = scaleBand()
    .domain(metrics.map((_, i) => i))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const yScale = scaleLinear()
    .domain([0, max(metrics, (d) => d.averagetime)])
    .range([height - margin.top - margin.bottom, 0]);

  import AxisX from '../test-stuff/AxisX.svelte';
  import AxisY from '../test-stuff/AxisY.svelte';
  import Tooltip from '../test-stuff/Tooltip.svelte';

  let hoveredData;
  // $: console.log(hoveredData);
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
      {#each metrics.sort((a, b) => a.averagetime - b.averagetime) as data, i}
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <rect
          x={xScale(i)}
          y={yScale(data.averagetime)}
          width={xScale.bandwidth()}
          height={height - margin.top - margin.bottom - yScale(data.averagetime)}
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
