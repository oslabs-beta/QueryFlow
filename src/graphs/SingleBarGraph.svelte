<script lang="ts">
  import { onMount } from 'svelte';
  import { select, scaleBand, scaleLinear, axisBottom, axisLeft, type ScaleBand, type ScaleLinear } from 'd3';
  import type { QueryData, GraphData, Directions } from '../types';
  import { max } from 'd3-array';

  export let metric: QueryData;
  export let i: number;

  // extracts the necessary data from metric obj
  const planningTime: GraphData[] = metric.queryMetrics.map((obj, i) => ({
    x: i + 1,
    y: obj.planningTime,
    type: 'A',
    name: 'Planning Time'
  }));

  const executionTime: GraphData[] = metric.queryMetrics.map((obj, i) => ({
    x: i + 1,
    y: obj.executionTime,
    type: 'B',
    name: 'Execution Time'
  }));

  const totalTime: GraphData[] = metric.queryMetrics.map((obj, i) => ({
    x: i + 1,
    y: obj.totalTime,
    type: 'C',
    name: 'Total Time'
  }));

  // gets max value for later use on yScale var
  const maxYValue: number = max([...executionTime, ...planningTime, ...totalTime], d => d.y) || 0;

  // renders chart on mount
  onMount(() => {
    const svg = select(`#barChart${i}`);
    const margin: Directions = { top: 20, right: 20, bottom: 40, left: 40 };
    const width: number = 300 - margin.left - margin.right;
    const height: number = 300 - margin.top - margin.bottom;

    const xScale: ScaleBand<string> = scaleBand()
      .domain([...Array(totalTime.length + 1).keys()].map(String).slice(1))
      .range([0, width])
      .padding(0.1);

    const yScale: ScaleLinear<number, number> = scaleLinear()
      .domain([0, maxYValue])
      .range([height, 0]);

    // actual x-axis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(axisBottom(xScale));
      
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
    
    // labels for graph bars
    const tooltip = select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(0, 0, 0, 0.7)')
      .style('color', 'white')
      .style('padding', '4px 8px')
      .style('font-size', '12px');

    // planning time bar  
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('.bar')
      .data(planningTime)
      .enter()
      .append('rect')
      .attr('class', 'bar A')
      .attr('x', d => xScale(d.x.toString()))
      .attr('y', d => yScale(d.y))
      .attr('width', xScale.bandwidth() / 3)
      .attr('height', d => height - yScale(d.y))
      .on('mouseover', (event, d) => {
        tooltip.style('visibility', 'visible').text(`${d.name}: ${d.y.toFixed(2)} ms`);
      })
      .on('mousemove', (event) => {
        tooltip.style('top', `${event.pageY - 10}px`).style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });
    
    // execution time bar
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('.bar')
      .data(executionTime)
      .enter()
      .append('rect')
      .attr('class', 'bar B')
      .attr('x', d => xScale(d.x.toString()) + xScale.bandwidth() / 3)
      .attr('y', d => yScale(d.y))
      .attr('width', xScale.bandwidth() / 3)
      .attr('height', d => height - yScale(d.y))
      .on('mouseover', (event, d) => {
        tooltip.style('visibility', 'visible').text(`${d.name}: ${d.y.toFixed(2)} ms`);
      })
      .on('mousemove', (event) => {
        tooltip.style('top', `${event.pageY - 10}px`).style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });
    
    // total time bar
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('.bar')
      .data(totalTime)
      .enter()
      .append('rect')
      .attr('class', 'bar C')
      .attr('x', d => xScale(d.x.toString()) + (2 * xScale.bandwidth()) / 3)
      .attr('y', d => yScale(d.y))
      .attr('width', xScale.bandwidth() / 3)
      .attr('height', d => height - yScale(d.y))
      .on('mouseover', (event, d) => {
        tooltip.style('visibility', 'visible').text(`${d.name}: ${d.y} ms`);
      })
      .on('mousemove', (event) => {
        tooltip.style('top', `${event.pageY - 10}px`).style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });
  });
</script>

<div class="h-80">
  <h4 class="flex justify-center -my-3 font-semibold">Single {metric.queryName} metrics</h4>
  <svg id={`barChart${i}`} class="w-74 h-full"></svg>
</div>


