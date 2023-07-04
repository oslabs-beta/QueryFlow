<script>
  import { onMount } from 'svelte';
  import { select, scaleLinear, axisBottom, axisLeft } from 'd3';
  import { max } from 'd3-array';

  export let data = [];

  onMount(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = data.length * 30 - margin.top - margin.bottom;

    const svg = select('.scatterplot')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales for the x and y axes
    const xScale = scaleLinear()
      .domain([0, max(data, d => d.planningTime + d.executionTime)])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, height]);

    // Add the x-axis
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(xScale));

    // Add the y-axis
    svg.append('g')
      .call(axisLeft(yScale).tickFormat((d, i) => i));

    // Add the planningTime points
    svg.selectAll('.planningTime')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.planningTime))
      .attr('cy', (d, i) => yScale(i))
      .attr('r', 4)
      .attr('fill', 'blue');

    // Add the executionTime points
    svg.selectAll('.executionTime')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.executionTime))
      .attr('cy', (d, i) => yScale(i))
      .attr('r', 4)
      .attr('fill', 'red');

    // Add the combined time points
    svg.selectAll('.combinedTime')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.planningTime + d.executionTime))
      .attr('cy', (d, i) => yScale(i))
      .attr('r', 4)
      .attr('fill', 'yellow');
  });
</script>

<div class="scatterplot"></div>

<style>
  .scatterplot {
    width: 500px;
    height: 100%;
  }
</style>
