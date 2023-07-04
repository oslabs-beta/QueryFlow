<script>
  export let metric;
  // console.log('data in overview', metric)
  import { onMount } from 'svelte';
  import { select, scaleLinear, axisLeft, axisBottom } from 'd3';
  import { max } from 'd3-array';
  export let i;

  const data = [
    { x: 10, y: 5 },
    { x: 20, y: 11 },
    { x: 30, y: 12 },
    { x: 40, y: 13 },
  ];

  // formats query(x) planning time(y) data
  const planningTime = metric.querymetrics.map((obj, i) => {
    return { x: i + 1, y: obj.planningTime, type: 'A' };
  });

  const executionTime = metric.querymetrics.map((obj, i) => {
    return { x: i + 1, y: obj.executionTime, type: 'B' };
  });

  const totalTime = metric.querymetrics.map((obj, i) => {
    return { x: i + 1, y: obj.planningTime + obj.executionTime, type: 'C' };
  });
  console.log('i am execution time', [...executionTime, ...planningTime, ...totalTime]);

  // get high value for domain
  const getHighValue = (array, property) => {
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
      .domain([0, getHighValue(totalTime, 'x')])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, getHighValue(totalTime, 'y')])
      .range([height, 0]);

    const xAxis = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(axisBottom(xScale));

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
        tooltip.style('visibility', 'visible').text(`${d.type}: ${d.y} ms`);
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
      .attr('transform', `translate(${margin.left - 25}, ${margin.top + height / 2}) rotate(-90)`)
      .style('text-anchor', 'middle')
      .text('Milliseconds');

    // Tooltip
    const tooltip = select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden');

    //Keybox
    const keyBox = svg.append('g').attr('transform', `translate(${width + margin.left + 10}, ${margin.top})`);

keyBox
  .selectAll('.legend-dot')
  .data([{ type: 'A', label: 'Planning Time' }, { type: 'B', label: 'Execution Time' }, { type: 'C', label: 'Total Time' }])
  .enter()
  .append('circle')
  .attr('class', (d) => `legend-dot ${d.type}`)
  .attr('cx', 10)
  .attr('cy', (d, i) => i * 20)
  .attr('r', 3);

keyBox
  .selectAll('.legend-label')
  .data([{ type: 'A', label: 'Planning Time' }, { type: 'B', label: 'Execution Time' }, { type: 'C', label: 'Total Time' }])
  .enter()
  .append('text')
  .attr('class', 'legend-label')
  .attr('x', 20)
  .attr('y', (d, i) => i * 20 + 4)
  .text((d) => d.label);
});  

</script>

<svg id={`scatterPlot${i}`} style="width: 100%; height: 100%"></svg>





<!-- ========== GEORGE'S TEST STUFF PLEASE DO NOT DELETE ========== -->
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
<!-- ========== END OF GEORGE'S TEST STUFF ========== -->
  




