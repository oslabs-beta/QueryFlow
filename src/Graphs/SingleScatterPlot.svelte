<script lang="ts">
  
  // console.log('data in overview', metric)
  import type { QueryData, QueryMetrics, GraphData } from '../types';
  import { onMount } from 'svelte';
  import { select, scaleLinear, axisLeft, axisBottom } from 'd3';
  import { max } from 'd3-array';

  export let metric: QueryData;
  export let i: number;


  // declare in global file namespace
  let planningTime: GraphData[], executionTime: GraphData[], totalTime: GraphData[];

  $: {

  // formats query(x) planning time(y) data
  planningTime = metric.queryMetrics.map((obj: QueryMetrics, i: number) => {
    return { x: i + 1, y: obj.planningTime, type: 'A', name: 'Planning Time' };
  });

  executionTime = metric.queryMetrics.map((obj: QueryMetrics, i: number) => {
    return { x: i + 1, y: obj.executionTime, type: 'B', name: 'Execution Time'};
  });

  totalTime = metric.queryMetrics.map((obj: QueryMetrics, i: number) => {
    return { x: i + 1, y: obj.planningTime + obj.executionTime, type: 'C',name: 'Total Time' };
  });
  }


  // function renderChart() {
  const getHighValue = (array: {x: number, y: number}[], property: 'x' | 'y') => {
    if (!array.length) return 0;
    let highVal = -Infinity;
    array.forEach((el) => {
      if (highVal < el[property]) highVal = el[property];
    });
    return Math.ceil(highVal * 1.2);
  };

  // render chart on mount
  onMount(() => {
    const svg = select(`#scatterPlot${i}`);

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 300 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom; // Increase the height here

    const xScale = scaleLinear()
      .domain([0, metric.queryMetrics.length + 1])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, getHighValue(totalTime, 'y')])
      .range([height, 0]);

    const xAxis = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(axisBottom(xScale).ticks(metric.queryMetrics.length+1));

    const yAxis = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(axisLeft(yScale));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('circle')
      .data([...executionTime, ...planningTime, ...totalTime])
      .enter()
      .append('circle')
      .attr('class', (d) => `dot ${d.type}`)
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 3)
      .on('mouseover', (event, d) => {
        tooltip.style('visibility', 'visible').text(`${d.name}: ${d.y} ms`);
      })
      .on('mousemove', (event) => {
        tooltip
          .style('top', `${event.pageY - 10}px`)
          .style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

     // X-axis label
     svg
      .append('text')
      .attr('class', 'axis-label')
      .attr('transform', `translate(${(width - 75)}, ${height + margin.top + 35})`)
      .style('text-anchor', 'middle')
      .text('Number of times query run');

    // Y-axis label
    svg
      .append('text')
      .attr('class', 'axis-label')
      .attr('transform', `translate(${margin.left - 30}, ${margin.top + height / 2}) rotate(-90)`)
      .style('text-anchor', 'middle')
      .text('Milliseconds');

    // Tooltip
    const tooltip = select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden');

    //Keybox
    const keyBox = svg.append('g').attr('transform', `translate(${width-80}, ${margin.top+10})`);

// keyBox
//   .selectAll('.legend-dot')
//   .data([{ type: 'A', label: 'Planning Time' }, { type: 'B', label: 'Execution Time' }, { type: 'C', label: 'Total Time' }])
//   .enter()
//   .append('circle')
//   .attr('class', (d) => `legend-dot ${d.type}`)
//   .attr('cx', 10)
//   .attr('cy', (d, i) => i * 20)
//   .attr('r', 3);

// keyBox
//   .selectAll('.legend-label')
//   .data([{ type: 'A', label: 'Planning Time' }, { type: 'B', label: 'Execution Time' }, { type: 'C', label: 'Total Time' }])
//   .enter()
//   .append('text')
//   .attr('class', 'legend-label')
//   .attr('x', 20)
//   .attr('y', (d, i) => i * 20 + 4)
//   .text((d) => d.label);
});  

</script>

<div class="h-80">

  <svg id={`scatterPlot${i}`} class="w-74 h-full" ></svg>
</div>

<!-- style="width: 100%; height: 100%" -->




<!-- ========== REFACTORING REFERENCE FOR SVG'S PLEASE DO NOT DELETE ========== -->
<!-- INSIDE OF SCRIPT -->
<!-- let width = 400 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom;

const xScale = scaleLinear()
  .domain([0, getHighValue(totalTime, 'x')])
  .range([0, width]);

const yScale = scaleLinear()
  .domain([0, getHighValue(totalTime, 'y')])
  .range([height, 0]); -->

<!-- OUTSIDE OF SCRIPT -->
<!-- <svg {width} {height}>
  {#each data as d}
  <circle cx={xScale(d.grade)}
          cy={yScale(d.hours)}
          r='10'
          fill='purple'
          stroke='black'
          />
  {/each}
</svg> -->
<!-- ========== END OF REFACTORING REFERENCE TEST STUFF ========== -->
  




