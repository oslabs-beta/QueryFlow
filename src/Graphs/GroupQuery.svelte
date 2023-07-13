<script lang="ts">
  import { onMount } from 'svelte';
  import { select, scaleBand, scaleLinear, axisBottom, axisLeft, type ScaleBand, type ScaleLinear } from 'd3';
  import { max } from 'd3-array';
  import { metricData } from '../store';
  import type { QueryData, QueryMetrics, GraphData } from '../types';
  
  
  
  export let metricName: string;
  export let i: number;

  export let groupMetrics: QueryData[] = [];
  
metricData.subscribe(data => {
  groupMetrics = data.filter(obj=>obj.queryName===metricName) 
});


const averageTime: GraphData[] = groupMetrics.map((obj, i) => ({
    x: i + 1,
    y: obj.averageTime,
    type: 'A',
    name: metricName,
    date: obj.createdAt

  }));


  

  const maxYValue = max([...averageTime], d => d.y) || 0;

  // Render chart on mount
  onMount(() => {
    const svg = select(`#groupBarChart${i}`);

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 300 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const xScale: ScaleBand<string> = scaleBand()
      .domain(`${[...Array(averageTime.length + 1).keys()].slice(1)}`)
      .range([0, width])
      .padding(0.1);

    const yScale: ScaleLinear<number, number> = scaleLinear()
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
      .text(`${metricName} Avg Time`);

    // Y-axis label
    svg
      .append('text')
      .attr('class', 'axis-label')
      .attr('transform', `translate(${margin.left - 30}, ${margin.top + height / 2}) rotate(-90)`)
      .style('text-anchor', 'middle')
      .text('Milliseconds');

    const tooltip = select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(0, 0, 0, 0.7)')
      .style('color', 'white')
      .style('padding', '4px 8px')
      .style('font-size', '12px');

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('.bar')
      .data(averageTime)
      .enter()
      .append('rect')
      .attr('class', 'bar A')
      .attr('x', d => xScale(`${d.x}`) + xScale.bandwidth() / 3)
      .attr('y', d => yScale(d.y))
      .attr('width', xScale.bandwidth() / 3)
      .attr('height', d => height - yScale(d.y))
      .on('mouseover', (event, d) => {
        tooltip.style('visibility', 'visible').text(`${d.name}: ${d.y} ms on ${d.date}`);
      })
      .on('mousemove', (event) => {
        tooltip.style('top', `${event.pageY - 10}px`).style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    
  });
</script>
<div class="h-80 group-query">

  <svg id={`groupBarChart${i}`} class="w-74 h-full"></svg>
</div>