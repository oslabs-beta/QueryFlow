<script lang="ts">
  import SingleSingleBarGraph from "../Graphs/SingleSingleBarGraph.svelte";
  import SingleScatterPlot from "../Graphs/SingleScatterPlot.svelte";
  import GroupQuery from "../Graphs/GroupQuery.svelte";
export let metric;
export let i;
console.log('i am metrics.svelte',metric)
</script>


<section class="card border metric-box">
<!-- <SingleSingleBarGraph {i} metric={metric}/> -->
  <SingleScatterPlot {i} metric={metric}/>
  <GroupQuery {i} metricName={metric.queryname} />
</section>

<style>
  .metric-box{
    width: 500px;
    height: 700px;
  }
</style>