<script lang="ts">
  import type { QueryData, QueryMetrics, GraphData, Directions } from '../types';
  import { onMount } from 'svelte';
  import { select, scaleLinear, axisLeft, axisBottom, type ScaleLinear } from 'd3';

  export let metric: QueryData;
  export let i: number;


  // declare in global file namespace
  let planningTime: GraphData[];
  let executionTime: GraphData[];
  let totalTime: GraphData[];

  $: {

    // formats query(x) planning time(y) data
    planningTime = metric.queryMetrics.map((obj: QueryMetrics, i: number) => {
      return {
        x: i + 1,
        y: obj.planningTime,
        type: 'A',
        name: 'Planning Time',
      };
    });

    executionTime = metric.queryMetrics.map((obj: QueryMetrics, i: number) => {
      return {
        x: i + 1,
        y: obj.executionTime,
        type: 'B',
        name: 'Execution Time',
      };
    });

    totalTime = metric.queryMetrics.map((obj: QueryMetrics, i: number) => {
      return {
        x: i + 1,
        y: obj.totalTime,
        type: 'C',
        name: 'Total Time',
      };
    });
  }

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
  const margin: Directions = { top: 20, right: 20, bottom: 40, left: 40 };
  const width: number = 300 - margin.left - margin.right;
  const height: number = 300 - margin.top - margin.bottom;

  const xScale: ScaleLinear<number, number> = scaleLinear()
    .domain([0, getHighValue(totalTime, 'x')])
    .range([0, width]);

  const yScale: ScaleLinear<number, number> = scaleLinear()
    .domain([0, getHighValue(totalTime, 'y')])
    .range([height, 0]);

  // actual x-axis
  svg
  .append('g')
  .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
  .call(axisBottom(xScale).ticks(metric.queryMetrics.length+1));

  // x-axis label
  svg
  .append('text')
  .attr('class', 'axis-label')
  .attr('transform', `translate(${(width - 75)}, ${height + margin.top + 35})`)
  .style('text-anchor', 'middle')
  .text('Number of times query run');
  
  // actual y-axis
  svg
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)
  .call(axisLeft(yScale));

  // y-axis label
  svg
  .append('text')
  .attr('class', 'axis-label')
  .attr('transform', `translate(${margin.left - 30}, ${margin.top + height / 2}) rotate(-90)`)
  .style('text-anchor', 'middle')
  .text('Milliseconds');
    
  // tooltip
  const tooltip = select('body')
  .append('div')
  .attr('class', 'tooltip')
  .style('position', 'absolute')
  .style('top', '0')
  .style('visibility', 'hidden');
  
  // plot points, also adds the tooltip
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
  .on('mouseover', (_, d) => {
    tooltip.style('visibility', 'visible').text(`${d.name}: ${d.y.toFixed(2)} ms`);
  })
  .on('mousemove', (event) => {
    tooltip
    .style('top', `${event.pageY - 10}px`)
    .style('left', `${event.pageX + 10}px`);
  })
  .on('mouseout', () => {
    tooltip.style('visibility', 'hidden');
  });
});  

</script>

<div class="h-80">
  <h4 class="flex justify-center -my-3 font-semibold text-xs">Single {metric.queryName} Metrics</h4>
  <svg id={`scatterPlot${i}`} class="w-74 h-full"></svg>
</div>