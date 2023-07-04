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
const planningTime = metric.querymetrics.map((obj,i)=>{
  return {x:i+1,y:obj.planningTime, type: 'A'}
})

const executionTime = metric.querymetrics.map((obj,i)=>{
  return {x:i+1,y:obj.executionTime, type: 'B'}
})

const totalTime = metric.querymetrics.map((obj,i) => {
  return {x:i+1,y:obj.planningTime + obj.executionTime, type: 'C'}
})
console.log('i am execution time',[...executionTime,...planningTime,...totalTime])

// get high value for domain
const getHighValue = (array, property) => {
  if (!array.length) return 0
  let highVal = -Infinity
  array.forEach( (el) => {
    if (highVal < el[property]) highVal = el[property]
  })
  return Math.ceil(highVal* 1.2)
}

// import { max } from 'd3-array';
// .domain([0, max(planningTime, d => d.x)]);

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
    .data([...executionTime,...planningTime,...totalTime])
    .enter()
    .append('circle')
    .attr('class', (d) => `dot ${d.type}`)
    .attr('cx', (d) => xScale(d.x))
    .attr('cy', (d) => yScale(d.y))
    .attr('r', 3);

    // x axis label, ewww it looks bad
    svg.append(`text`)
      .attr("transform", "translate(" + (width/2) + " ," + (height+60) + ")")
      .style("text-anchor", "middle")
      .text("query");
 
});
</script>

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
  
<style>
/* .dot {
    fill: steelblue;
  } */

  /* .dot.A {
    fill: red;
  }

  .dot.B {
    fill: blue;
  }

  .dot.C {
    fill: green;
  } */
</style>


  <svg id='scatterPlot{i}' style="width: 100%; height: 100%"></svg>








<!-- basic metric stuff  -->
<!-- <p>query name: {metric.queryname}</p>
<p>query count: {metric.querycount}</p>
{#each metric.querymetrics as smallMetric, i}
  <p>planning time query {i + 1}: {metric.querymetrics[i].planningTime}</p>
  <p>execution time query {i + 1}: {metric.querymetrics[i].executionTime}</p>
{/each} -->
