<script lang="ts">
  import Drawer from '../lib/Drawer.svelte';
  import Metrics from '../lib/Metrics.svelte';
  import { metricData,filterMetricData,filterMetricDataTwo } from '../store';
  import type { QueryData } from '../types';
  import { onMount } from 'svelte';
  import { derived } from 'svelte/store'
  import Cookies from 'js-cookie';
  import {isAuthenticated} from '../store'
 
  //Fun console.log for our landing page;
console.log(`
 ________  ___  ___  _______   ________      ___    ___ ________ ___       ________  ___       __      
|\\   __  \\|\\  \\|\\  \\|\\  ___ \\ |\\   __  \\    |\\  \\  /  /|\\  _____\\\\  \\     |\\   __  \\|\\  \\     |\\  \\    
\\ \\  \\|\\  \\ \\  \\\\\\  \\ \\   __/|\\ \\  \\|\\  \\   \\ \\  \\/  / | \\  \\__/\\ \\  \\    \\ \\  \\|\\  \\ \\  \\    \\ \\  \\   
 \\ \\  \\\\\\  \\ \\  \\\\\\  \\ \\  \\_|/_\\ \\   _  _\\   \\ \\    / / \\ \\   __\\\\ \\  \\    \\ \\  \\\\\\  \\ \\  \\  __\\ \\  \\  
  \\ \\  \\\\\\  \\ \\  \\\\\\  \\ \\  \\_|\\ \\ \\  \\\\  \\|   \\/  /  /   \\ \\  \\_| \\ \\  \\____\\ \\  \\\\\\  \\ \\  \\|\\__\\_\\  \\ 
   \\ \\_____  \\ \\_______\\ \\_______\\ \\__\\\\ _\\ __/  / /      \\ \\__\\   \\ \\_______\\ \\_______\\ \\____________\\
    \\|___| \\__\\|_______|\\|_______|\\|__|\\|__|\\___/ /        \\|__|    \\|_______|\\|_______|\\|____________|
          \\|__|                            \\|___|/                                                     
                                                                                                       
                                                                                                       
`);

  // storing all past metrics here
  let metrics: QueryData[] = [];
  
  // creates new store derived from metricData store
  // called whenever metricData changes
  const uniqueNames = derived (metricData, $metricData => {

    // mapping metricData arr into new arr with values 'queryName'
    const queryNames = $metricData.map(obj => obj.queryName);

    // removing duplicates with new Set
    return new Set(queryNames);
  }
);

  metricData.subscribe((data: QueryData[]) => {
    metrics = data;
  });

  // fetching metrics data according to user id - POST request
  const fetchData = async (token: string): Promise<void> => {
    try {
      const response = await fetch('/api/get-metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        
        // setting data response into store
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

        // setting data for selection dropdowns
        filterMetricData.set(getDataObj);
        filterMetricDataTwo.set(getDataObj);
      }
    } catch (error) {
      console.error(error);
    }
  };


  onMount(async () => {
    const cookie = Cookies.get('token');
    const revoke = Cookies.get('revoke');

    // if cookie exists, puts its info into localStorage, then deletes the cookie
    if (cookie) {
      localStorage.setItem("token", cookie);
      localStorage.setItem("revoke", revoke);
      Cookies.remove('token');
      Cookies.remove('revoke');
    }
    const token = localStorage.getItem('token');

    // if localStorage's token exists, user is now authenticated, fetch user's data
    if (token) {
      isAuthenticated.set(true);
      await fetchData(token);   
    }
  });

  // selection dropdown vars for each column
  let groupQueries: string = 'all';
  let groupQueriesTwo: string = 'all';

  // arrs for both column metrics, which are filtered by group queries values
  let filterMetricsArr: QueryData[] = [];
  let filterMetricsArrTwo: QueryData[] = [];
  
  // updating the according arr when the associated store is updated
  filterMetricData.subscribe(data => {
    filterMetricsArr = data;
  })

  filterMetricDataTwo.subscribe(data => {
    filterMetricsArrTwo = data;
  })

  // triggers on change of the top selection box
  const filterMetrics = (store: any, group: string):void => {
    if (group === 'all') {
      store.set(metrics);
    } else {
      store.set(metrics.filter(metric => metric.queryName === group));
    }
  };
</script>

<div class="w-full flex flex-col items-center content-center justify-center mt-6">
  <div>
    <!-- add a query button -->
    <label for="my-drawer" class="btn btn-primary drawer-button border-none hover:bg-secondary hover:text-white text-base">Add a Query</label>
  </div>
  <div class="flex-shrink-0">
    <!-- renders the sliding drawer component -->
    <Drawer />
  </div>
  <div class="mt-8 pb-10 w-screen grid sm:grid-cols-1 md:grid-cols-2 justify-center content-center">
    <div class="h-screen scrollbar-hide overflow-y-auto column-width">
      <!-- Selection dropdown input -->
      <select
        bind:value={groupQueries}
        name="database"
        id="database"
        class="bg-gray-50 border w-1/2 mx-auto border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 mt-2"
        on:change={() => { filterMetrics(filterMetricData, groupQueries) }}>
        <option value="all" selected hidden>Please choose...</option>

        <!-- makes the uniqueName Set into arr to iterate over and get your dropdown box values -->
        {#each Array.from($uniqueNames) as value}
          <option>{value}</option>
        {/each}
      </select>

      <div class="space-y-4  flex flex-col items-center mx-6">
        {#each filterMetricsArr as metric, i}
        <!-- iterates through the filter metrics array and pass down one metric object and an indexed to the component -->
        {#key metric}
        <!-- key re-renders the component inside if the passed in value changes -->
        <Metrics {i} {metric} />
        {/key}
        {/each}
      </div>
    </div>
    <div class="h-screen scrollbar-hide overflow-y-auto">

      <!-- second column, same as above with different var names -->
      <select
        bind:value={groupQueriesTwo}
        name="database"
        id="databaseTwo"
        class="bg-gray-50 mt-2 mb-2 border w-1/2 mx-auto border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        on:change={() => { filterMetrics(filterMetricDataTwo, groupQueriesTwo) }}>
        <option value="all" selected hidden>Please choose...</option>
        {#each Array.from($uniqueNames) as value}
        <option>{value}</option>
        {/each}
      </select>
      <div class="space-y-4 flex flex-col items-center justify-center mx-6">
        {#each filterMetricsArrTwo as metric, i}
        {#key metric}
        <!-- add 1000 to i to give id individuality and so it doesn't get confused with the first column Metric components -->
        <!-- technically could be faulty if a user has over 1000 queries -->
        <Metrics i={i + 1000} {metric} />
        {/key}
        {/each}
      </div>
    </div>
  </div>
</div>
