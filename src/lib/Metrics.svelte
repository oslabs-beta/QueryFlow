<script lang="ts">
  import SingleBarGraph from "../graphs/SingleBarGraph.svelte";
  import SingleScatterPlot from "../graphs/SingleScatterPlot.svelte";
  import GroupQuery from "../graphs/GroupQuery.svelte";
  import Table from "../graphs/Table.svelte"
  import { metricData, filterMetricData, filterMetricDataTwo } from '../store';
  import type { QueryData } from '../types';
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';
  import {Tooltip} from 'flowbite-svelte'
  export let metric: QueryData;
  export let i: number;
  
  // get all the metrics from the store
  const allMetrics: QueryData[] = get(metricData);

  
  // Boolean values for toggling are bar/scatter graph or table/string div
  let scatterBarToggle: boolean = false;
  let queryTableToggle: boolean = false;

  const toggleGraphs: Function = (): void => {
    scatterBarToggle = !scatterBarToggle;
  }
  
  // delete metric DELETE Request
  const deleteMetric: Function = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    try {
      const response: any = await fetch('/api/delete-metrics-id', {
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ _id: metric._id }),
      })
      if (response.ok) {
        alert('metric deleted');
        // removes the metric by id from the local metrics array
        const newFilteredMetrics: QueryData[] = allMetrics.filter(obj => obj._id !== metric._id);
      
        // set the main metric data store to the filtered metrics array but without the deleted metric
        metricData.set(newFilteredMetrics);
      
        // changes the two columns filter metric store value
        // updates the filterMetric stores
        filterMetricData.update(values => values.filter(obj => obj._id !== metric._id));
        filterMetricDataTwo.update(values => values.filter(obj => obj._id !== metric._id));
      }
    } catch (error) {
      console.log(error);
    }
  }

onMount(() => {

    // functionality for copy button in queryString box
    const copyButton: HTMLElement = document.getElementById(`copyButton${i}`);
    copyButton.addEventListener('click', function() {
      // Create a temporary textarea to select the text and copy
      const tempTextArea: HTMLTextAreaElement = document.createElement('textarea');
      tempTextArea.value = metric.queryString;
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
        <label class="relative inline-flex items-center mb-5 cursor-pointer">

          <input type="checkbox" value="" class="sr-only peer"  bind:checked={queryTableToggle}>
          {#if queryTableToggle}
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
          </svg>
          <Tooltip>{queryTableToggle ? 'Query String' : 'Table'}</Tooltip>
          {:else}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
          </svg>
          <Tooltip>{queryTableToggle ? 'Query String' : 'Table'}</Tooltip>
          {/if}

        </label>
      </div>
      <!-- card title -->
      <h4 class="text-lg">{metric.queryName}</h4>
      
       <!-- delete button (trashcan) -->
      <button
        type="button"
        class="text-primary btn btn-sm border-none bg-transparent hover:bg-secondary hover:text-white focus:outline-none font-medium rounded-full text-sm p-1 text-center inline-flex items-center dark:border-primary dark:text-primary dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-secondary"
        on:click={() => deleteMetric()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
      <div class="flex justify-center w-full h-72">
        <!-- displays query string when untoggled (false), Table stats when toggled (true) -->
        {#if queryTableToggle}
        <Table metric={metric}/>
        {:else}
        <div class="mockup-code m-4 pl-4 pb-4 relative scrollbar-hide" style="max-height:300px; overflow-y: auto;">
          <pre><code style="font-size:9px;">{metric.queryString}</code></pre>

          <!-- copy button -->
          <button id="copyButton{i}" class="btn btn-square btn-sm absolute right-1 top-1 mt-2 mr-2 text-lg bg-transparent border-0 hover:bg-transparent hover:border rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          </button>
        </div>
        {/if}
    </div>
      <div class="flex justify-center w-full h-72">
        
        <!-- bottom left metric box group graph for a comparison of all metrics of that type -->
        <GroupQuery {i} metricName={metric.queryName} />
        <div class="flex">
            <!-- if scatterBarToggle is true, display SingleBarGraph Component, else, display SingleScatterPlot -->
          {#if scatterBarToggle}
          <SingleBarGraph {i} metric={metric}/>
          {:else}
          <SingleScatterPlot {i} metric={metric}/>
          {/if}
          <!-- button toggle between bar graph or scatter -->
          <button class="btn btn-square btn-xs btn-square btn-xs btn-outline -ml-5" on:click={() => toggleGraphs()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
              <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
            </svg>
          </button>
        </div>
      </div>
</section>

<style>
  /* metric card styling */
  .card {
    background-color: rgb(255, 255, 248);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 12px;
  }
  /* card height */
  .metric-box{
    height: 700px;
  }
</style>