<script lang="ts">
  import { onMount } from 'svelte';
  import { select, scaleBand, scaleLinear, axisBottom, axisLeft } from 'd3';
  import type { QueryData,GraphData } from '../types';
  import { max } from 'd3-array';

  export let metric: QueryData;
  export let i: number;

  // Extract the necessary data from the metric object
  const planningTime:GraphData[] = metric.queryMetrics.map((obj, i) => ({
    x: i + 1,
    y: obj.planningTime,
    type: 'A',
    name: 'Planning Time'
  }));

  const executionTime:GraphData[] = metric.queryMetrics.map((obj, i) => ({
    x: i + 1,
    y: obj.executionTime,
    type: 'B',
    name: 'Execution Time'
  }));

  const totalTime:GraphData[] = metric.queryMetrics.map((obj, i) => ({
    x: i + 1,
    y: obj.planningTime + obj.executionTime,
    type: 'C',
    name: 'Total Time'
  }));

  // Calculate the maximum value for the y-axis domain
  const maxYValue = max([...executionTime, ...planningTime, ...totalTime], d => d.y) || 0;

  // Render chart on mount
  onMount(() => {
    const svg = select(`#barChart${i}`);

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 300 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const xScale = scaleBand()
    //scaleBand requires an array of strings for its domain. For Typing
      .domain([...Array(totalTime.length + 1).keys()].map(String).slice(1))
      .range([0, width])
      .padding(0.1);

    const yScale = scaleLinear()
      .domain([0, maxYValue])
      .range([height, 0]);

    const xAxis = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(axisBottom(xScale));

    const yAxis = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(axisLeft(yScale));

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
    
    // Labels for graph bars
    const tooltip = select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(0, 0, 0, 0.7)')
      .style('color', 'white')
      .style('padding', '4px 8px')
      .style('font-size', '12px');

    //Planning Time Bar  
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
        tooltip.style('visibility', 'visible').text(`${d.name}: ${d.y} ms`);
      })
      .on('mousemove', (event) => {
        tooltip.style('top', `${event.pageY - 10}px`).style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });
    
    //Execution Time Bar
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
        tooltip.style('visibility', 'visible').text(`${d.name}: ${d.y} ms`);
      })
      .on('mousemove', (event) => {
        tooltip.style('top', `${event.pageY - 10}px`).style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });
    
    //Total Time Bar
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
  <svg id={`barChart${i}`} class="w-74 h-full"></svg>
</div>


