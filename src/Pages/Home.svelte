<script lang="ts">

  import Drawer from '../lib/Drawer.svelte';
  import Metrics from '../lib/Metrics.svelte';
  import { get } from 'svelte/store';
  import { userInfoStore, metricData,filterMetricData,filterMetricDataTwo } from '../store';
  import { onMount } from 'svelte';
  import { derived } from 'svelte/store'
  import { navigate } from 'svelte-routing';

  let userInfo = get(userInfoStore);
  console.log('user info in home', userInfo);

  let metrics = [];
  const uniqueNames = derived(metricData, $metricData => {
  return new Set($metricData.map(obj => obj.queryname));
});

  metricData.subscribe(data => {
    metrics = data;
    // if(uniqueNames===undefined){
    //   uniqueNames = new Set(data.map(obj => obj.queryname));
    // } else{
    //   uniqueNames = new Set([...uniqueNames,...data.map(obj => obj.queryname)])
    // }   
  });

  const fetchData = async () => {
    try {
      const response = await fetch('/api/getmetrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: userInfo._id }),
      });
      if (response.ok) {
        const data = await response.json();
        metricData.set(data);
        filterMetricData.set(data);
      filterMetricDataTwo.set(data);
        // console.log('data in metrics AFTER post request: ', data);
      }
    } catch (error) {
      console.error(error);
    }
  };


  onMount(async () => {
    if (userInfo._id !== '') {
      await fetchData();    
    }
  });

  let groupQueries: string = 'all';
  let groupQueriesTwo: string = 'all'
  let filterMetricsArr = []
  let filterMetricsArrTwo = []
  
  filterMetricData.subscribe(data => {
    filterMetricsArr=data
  })
 
  filterMetricDataTwo.subscribe(data=>{
    filterMetricsArrTwo=data
  })



  const filterMetrics = (store,group) => {
    if (group === 'all') {
      store.set(metrics);
    } else {
      const filteredMetrics = metrics.filter(metric => metric.queryname === group)
      store.set(filteredMetrics);
    }
  };
  
</script>

<!-- TEMPORARY BUTTON FOR GOING TO /all-metrics -->
<button class="btn btn-primary" on:click={() => {navigate('/all-metrics')}}>navigation test</button>
<!-- END OF TEMPORARY BUTTON -->

<div class="w-full flex flex-col items-center content-center justify-center">
  <div class="flex-shrink-0 ">
    <Drawer userId={userInfo._id} />
  </div>

  <div class="mt-8 w-screen grid sm:grid-cols-1 md:grid-cols-2 justify-center content-center">
    <div class="h-screen scrollbar-hide  overflow-y-auto column-width">
      <select
        bind:value={groupQueries}
        name="database"
        id="database"
        class="bg-gray-50 border w-1/2 mx-auto border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
        on:change={() => { filterMetrics(filterMetricData, groupQueries) }}
      >
        <option value="all" selected hidden>Please choose...</option>
        {#each Array.from($uniqueNames) as value}
          <option>{value}</option>
        {/each}
      </select>

      <div class="space-y-4  flex flex-col items-center
      mx-6">
        {#each filterMetricsArr as metric, i}
        {#key metric}
        <Metrics {i} {metric} />
        {/key}
  
        {/each}
      </div>
    </div>
    <div class="h-screen scrollbar-hide overflow-y-auto">
      <select
        bind:value={groupQueriesTwo}
        name="database"
        id="databaseTwo"
        class="bg-gray-50  mb-2 border w-1/2 mx-auto border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        on:change={() => { filterMetrics(filterMetricDataTwo, groupQueriesTwo) }}
      >
        <option value="all" selected hidden>Please choose...</option>
        {#each Array.from($uniqueNames) as value}
        <option>{value}</option>
        {/each}
      </select>

      <div class="space-y-4 flex flex-col items-center justify-center  mx-6">
        {#each filterMetricsArrTwo as metric, i}
     
        {#key metric}
        <Metrics i={i + 1000} {metric} />
        {/key}
        {/each}
      </div>
    </div>
  </div>
</div>




<style>
  
</style>





