<!-- 
<script>
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  // export let metric;
  onMount(async () => {
    // set the dimensions and margins of the graph
  const margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
  
  // append the svg object to the body of the page
  const svg = d3.select('#myvizdata')
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            `translate(${margin.left}, ${margin.top})`);
  
  //Read the data
  d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv").then(function(data) {
  
    // Add X axis
    const x = d3.scaleLinear()
      .domain([4, 8])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));
  
    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 9])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));
  
    // Color scale: give me a specie name, I return a color
    const color = d3.scaleOrdinal()
      .domain(["setosa", "versicolor", "virginica" ])
      .range([ "#440154ff", "#21908dff", "#fde725ff"])
  
    // Add dots
    svg.append('g')
      .selectAll("dot")
      .data(data)
      .join("circle")
        .attr("cx", function (d) { return x(d.Sepal_Length); } )
        .attr("cy", function (d) { return y(d.Petal_Length); } )
        .attr("r", 5)
        .style("fill", function (d) { return color(d.Species) } )
  
  })
  })
  
  </script>




<svg id='myvizdata' style="width: 100%; height: 100%"></svg>
















<!-- <script>
  // import d3
  import * as d3 from 'd3';
  // get prop
  export let metric;


  const svg = d3.select("body")

// Create a scale: transform value in pixel
const x = d3.scaleLinear()
    .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([0, 400]);       // This is the corresponding value I want in Pixel
// Try console.log( x(25) ) to see what this x function does.

// Add 3 dots for 0, 50 and 100%
svg.append("circle")
  .attr("cx", x(10)).attr("cy", 100).attr("r", 40).style("fill", "blue");
svg.append("circle")
  .attr("cx", x(50)).attr("cy", 100).attr("r", 40).style("fill", "red");
svg.append("circle")
  .attr("cx", x(100)).attr("cy", 100).attr("r", 40).style("fill", "green");

</script> --> -->