<script lang="ts">
  import SingleSingleBarGraph from "../Graphs/SingleSingleBarGraph.svelte";
  import SingleScatterPlot from "../Graphs/SingleScatterPlot.svelte";
  import GroupQuery from "../Graphs/GroupQuery.svelte";
  import Table from "../Graphs/Table.svelte"
  import {  metricData,filterMetricData,filterMetricDataTwo} from '../store';
  import { get } from 'svelte/store';

export let metric;
export let i;

const allMetrics = get(metricData)
let barScatterToggle:boolean=false;
console.log(metric)
const deleteMetric = async () =>{
  try {
    const response =  await fetch('/api/deletemetricsid',{
      method:'DELETE',
      headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({_id:metric._id}),
    })
    if(response.ok){
      alert('metric deleted');
      const newFilteredMetrics = allMetrics.filter(obj=>obj._id !==metric._id)
      metricData.set(newFilteredMetrics)
      filterMetricData.update(values => values.filter(obj => obj._id !== metric._id));
      filterMetricDataTwo.update(values => values.filter(obj => obj._id !== metric._id));
    }
  } catch (error) {
}
}
</script>


<section class="card border w-full metric-box p-4 justify-center grid grid-cols-1">
    <div class="h-10 flex p-4 justify-between items-center">
      <input type="checkbox" class="toggle" bind:checked={barScatterToggle} />
      <h4>{metric.queryname}</h4>
      <button
						type="button"
						class="text-primary border-2 border border-primary hover:bg-secondary hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center dark:border-primary dark:text-primary dark:hover:text-primary dark:focus:ring-blue-800 dark:hover:bg-white"
            on:click={deleteMetric}
            
					>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
      </svg>
      </button>
    </div>
    
      <div class="flex w-full h-72">
        {#if barScatterToggle}
      <SingleSingleBarGraph {i} metric={metric}/>
      {:else}
      <SingleScatterPlot {i} metric={metric}/>
      {/if}
      <div class="mockup-code m-4 pl-4 pb-4 ">
        <pre><code class="text-xs">{metric.querystring}</code></pre>
      </div>
    </div>
      <div class="flex w-full h-72">
        <GroupQuery {i} metricName={metric.queryname} />
        <Table {i} metric={metric}/>
      </div>
    

</section>

<style>
  .metric-box{
    height: 700px;
  }
</style>