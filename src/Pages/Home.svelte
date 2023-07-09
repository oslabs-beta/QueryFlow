<script lang="ts">
  import Drawer from '../lib/Drawer.svelte';
  import Metrics from '../lib/Metrics.svelte';
  import { get } from 'svelte/store';
  import { userInfoStore,metricData,filterMetricData,filterMetricDataTwo } from '../store';
  import type { QueryData,UserType } from '../types';
  import { onMount } from 'svelte';
  import { derived } from 'svelte/store'
  import { navigate } from 'svelte-routing';

  // get user's info from the userInfo Store
  let userInfo: UserType = get(userInfoStore);

  // store all past metrics in this array.
  let metrics: QueryData[] = [];
  
  // The `derived` function from Svelte is used to create a new store 
  // whose value is derived from the `metricData` store.
  const uniqueNames = derived(
  // `metricData` is the store from which we are deriving a new store.
  metricData,
  // This function is called whenever the value of `metricData` changes.
  // `$metricData` is the current value of `metricData`.
  $metricData => {
    // We use `map` to transform the `metricData` array into a new array 
    // where each element is the value of `queryName` in the original object.
    const queryNames = $metricData.map(obj => obj.queryName);
    // We then use the `Set` constructor to create a new set from the `queryNames` array.
    // The `Set` constructor automatically removes any duplicates, so the resulting set 
    // contains only unique `queryName` values.
    return new Set(queryNames);
  }
);

  // Any time the metricData store changes it trigger this function and updates are metrics array uptop
  metricData.subscribe((data: QueryData[]) => {
    metrics = data;
  });

  // this is out fetch query metrics data from the user's metric table by their id/cookie
  const fetchData = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('/api/get-metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ _id: userInfo._id }),
      });
      if (response.ok) {
        const data = await response.json();
        // we set the awaited response data into the store
        const getDataObj: QueryData[] = data.map((obj: any) => ({
          averageTime: obj.averagetime,
          createdAt: obj.createdat,
          queryCount: obj.querycount,
          queryDelay: obj.querydelay,
          queryName: obj.queryname,
          queryString: obj.querystring,
          queryMetrics: obj.querymetrics,
          _id: obj._id
        }))
        metricData.set(getDataObj);
        // we also set the filteredStores data too. These stores are for the selection box at the top
        // of the two columns
        filterMetricData.set(getDataObj);
        filterMetricDataTwo.set(getDataObj);
      }
    } catch (error) {
      console.error(error);
    }
  };


  onMount(async () => {
    // if userId is not an empty string then fetch data to get the users query metrics 
    if (userInfo._id !== '') {
      await fetchData();    
    }
  });

  // selection dropdown variables for each column
  let groupQueries: string = 'all';
  let groupQueriesTwo: string = 'all';

  // arrays for the two columns metrics which are filtered by group queries values
  let filterMetricsArr: QueryData[] = [];
  let filterMetricsArrTwo: QueryData[] = [];
  
  // if the filterMetrics function is run on selection of Metric
  // then the store will get update and the subscribe method will inturn
  // update the filterMetric arr
  filterMetricData.subscribe(data => {
    filterMetricsArr = data;
  })
 
  filterMetricDataTwo.subscribe(data => {
    filterMetricsArrTwo = data;
  })

  // FilterMetrics function which will trigger on change of the top selection box
  const filterMetrics = (store: any, group: string):void => {
    if (group === 'all') {
      store.set(metrics);
    } else {
      store.set(metrics.filter(metric => metric.queryName === group));
    }
  };
  
</script>

<div class="w-full flex flex-col items-center content-center justify-center">
  <!-- TEMPORARY BUTTON FOR GOING TO /all-metrics -->
<button class="btn btn-primary m-1 border-primary hover:bg-secondary hover:text-white hover:border-secondary" on:click={() => {navigate('/all-metrics')}}>Global Metrics</button>
<!-- END OF TEMPORARY BUTTON -->
  <div class="flex-shrink-0">
    <!-- Add Query Sliding Drawer -->
    <Drawer userId={userInfo._id} />
  </div>

  <div class="mt-8 w-screen grid sm:grid-cols-1 md:grid-cols-2 justify-center content-center">
    <div class="h-screen scrollbar-hide  overflow-y-auto column-width">
      <!-- Selection dropdown input -->
      <select
        bind:value={groupQueries}
        name="database"
        id="database"
        class="bg-gray-50 border w-1/2 mx-auto border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 mt-2"
        on:change={() => { filterMetrics(filterMetricData, groupQueries) }}
      >
        <option value="all" selected hidden>Please choose...</option>
        <!-- Make the uniqueName Set into array to iterate over and get your dropdown box values -->
        {#each Array.from($uniqueNames) as value}
          <option>{value}</option>
        {/each}
      </select>

      <div class="space-y-4  flex flex-col items-center
      mx-6">
        {#each filterMetricsArr as metric, i}
        <!-- Iterate through the filter metrics array and pass down one metric object and an indexed to the component -->
        {#key metric}
        <!-- Key re-renders the component inside if the passed in value changes, metric. -->
        <Metrics {i} {metric} />
        {/key}
        {/each}
      </div>
    </div>
    <div class="h-screen scrollbar-hide overflow-y-auto">
      <!-- Second column same as above just different variable names -->
      <select
        bind:value={groupQueriesTwo}
        name="database"
        id="databaseTwo"
        class="bg-gray-50 mt-2 mb-2 border w-1/2 mx-auto border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        <!-- add 1000 to i to give id individuality and so it doesn't get confused with the first column Metric components -->
        <Metrics i={i + 1000} {metric} />
        {/key}
        {/each}
      </div>
    </div>
  </div>
</div>

