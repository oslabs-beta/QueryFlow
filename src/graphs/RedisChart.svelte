<script lang="ts">
  import { onMount } from 'svelte';
  import { select } from 'd3-selection';
  import { scaleLinear, scaleBand } from 'd3-scale';
  import { axisBottom, axisLeft } from 'd3-axis';
  import { get } from 'svelte/store';
  import { redisData } from '../store';
  import type { RedisData } from '../types';
  
  const colors:string[] = ['#FF0000', '#00FF00'];
  
  let redisInfo:RedisData = get(redisData)


  onMount(() => {
    const svg = select('#chart');
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const x = scaleBand().range([0, width]).padding(0.1);
    const y = scaleLinear().range([height, 0]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Update the chart data
    x.domain(['Redis', 'PostgreSQL']);
    y.domain([0, Math.max(+redisInfo.totalTimeRedis, + redisInfo.totalTimeSQL)]);

    g.selectAll('.bar')
  .data([
    { label: 'Redis', value: + redisInfo.totalTimeRedis },
    { label: 'PostgreSQL', value: + redisInfo.totalTimeSQL }
  ])
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', d => x(d.label))
  .attr('y', d => y(d.value))
  .attr('width', x.bandwidth())
  .attr('height', d => height - y(d.value))
  .style('fill', (d, i) => colors[i]);

    g.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(x));

    g.append('g')
      .call(axisLeft(y));
  });
</script>


<main>

  <div style="width: 400px; height: 200px;">
    <svg id="chart" width="400" height="200"></svg>
  </div>
</main>