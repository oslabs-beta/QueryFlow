<script lang="ts">
  import SingleSingleBarGraph from "../Graphs/SingleSingleBarGraph.svelte";
  import SingleScatterPlot from "../Graphs/SingleScatterPlot.svelte";

export let metric;
export let i;

</script>


<section class="card border metric-box">

  <SingleScatterPlot {i} metric={metric}/>
</section>

<style>
  .metric-box{
    width: 500px;
    height: 500px;
  }
</style>