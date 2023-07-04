<script lang="ts">
  import ZoomableBarChart from "../visualizations/ZoomableBarChart.svelte";
  import Overview from "../visualizations/Overview.svelte";

export let metric;
export let i;

</script>


<section class="card border metric-box">
  <!-- <div>{metric.queryname}</div> -->
  <!-- <ZoomableBarChart metric={metric} /> -->
  <Overview {i} metric={metric}/>
</section>

<style>
  .metric-box{
    width: 500px;
    height: 500px;
  }
</style>