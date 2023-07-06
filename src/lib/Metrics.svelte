<script lang="ts">
  import SingleSingleBarGraph from "../Graphs/SingleSingleBarGraph.svelte";
  import SingleScatterPlot from "../Graphs/SingleScatterPlot.svelte";
  import GroupQuery from "../Graphs/GroupQuery.svelte";
  import Table from "../Graphs/Table.svelte"
  import {  metricData,filterMetricData,filterMetricDataTwo} from '../store';
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';
export let metric;
export let i;

const allMetrics = get(metricData)
let barScatterToggle:boolean=false;
let tableQueryToggle:boolean=false;
const toggleGraphs = ()=>barScatterToggle = !barScatterToggle;
  
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

onMount(() => {
    const copyButton = document.getElementById(`copyButton${i}`);
    copyButton.addEventListener('click', function() {
      // Create a temporary textarea to select the text and copy
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = metric.querystring;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);
    });
  });
</script>


<section class="card border w-full metric-box p-4 justify-center grid grid-cols-1">
    <div class="h-10 flex p-4 justify-between items-center">
      <div class="flex items-end h-20">
        <input type="checkbox" class="toggle" bind:checked={tableQueryToggle} />
      </div>
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
      <div class="flex justify-center w-full h-72">
        {#if tableQueryToggle}
        <Table {i} metric={metric}/>
        {:else}
        <div class="mockup-code m-4 pl-4 pb-4 relative scrollbar-hide " style="max-height:300px; overflow-y: auto;">
          <pre><code style="font-size:9px;">{metric.querystring}</code></pre>
          <!-- copy button -->
          <button id="copyButton{i}" class="btn btn-square btn-xs btn-outline absolute right-0 top-0 mt-2 mr-2 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
            
          </button>
        </div>
        {/if}
      
    </div>
      <div class="flex justify-center w-full h-72">
        <GroupQuery {i} metricName={metric.queryname} />
        <div>
          <button class="btn btn-square btn-xs btn-square btn-xs btn-outline absolute top-50 right-40 " on:click={toggleGraphs}>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
              <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
            </svg>
          </button>
            
          {#if barScatterToggle}
          <SingleSingleBarGraph {i} metric={metric}/>
          {:else}
          <SingleScatterPlot {i} metric={metric}/>
          {/if}
        </div>
      </div>
      

</section>

<style>
  .metric-box{
    height: 700px;
  }
</style>