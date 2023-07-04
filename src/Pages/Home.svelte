<script lang="ts">
	import Drawer from '../lib/Drawer.svelte';
	import Metrics from '../lib/Metrics.svelte';
	import { get } from 'svelte/store';
	import { userInfoStore, metricData } from '../store';
	import { onMount, onDestroy } from 'svelte';
	
	let userInfo = get(userInfoStore);
	console.log('user info in home', userInfo);

	export let metrics = [];
  let uniqueNames;
  let groupQueries: string = 'all'
  console.log(' I am group queries, in home.svelte', groupQueries)
	metricData.subscribe(data => {
		metrics = data;
    uniqueNames = new Set(data.map(obj=>obj.queryname))
	});
  console.log('i am uniqueNames', uniqueNames)
  console.log('data in metrics before post request: ', metrics)

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
        // console.log('data in fetch data: ', data);
        metricData.set(data)
				console.log('data in metrics AFTER post request: ', metrics)
				// render body again with response data
			}
		} catch (error) {}
    
  }
  
  onMount(() => {
		// if metrics in store grab it
		
		// if (!metricData.length) {}
		// otherwise fetch metrics
    if(userInfo._id !== '') fetchData()
    
	})
  
	// send a query to backend
</script>

<div class="w-full flex flex-col items-center content-center justify-center">
	<Drawer userId={userInfo._id} />
  <select
  bind:value={groupQueries}
  name="database"
  id="database"
  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
>
  <option value="all" disabled selected hidden>Please choose...</option>
  {#each Array.from(uniqueNames) as value}
  <option>{value}</option>
  {/each}
</select>
    <div class="mt-8 grid sm:grid-cols-1 md:grid-cols-1 gap-9 justify-center content-center">
			<!-- ADD STUFF HERE -->
      {#each metrics as metric, i} 
        <Metrics {i} {metric} />
      {/each}
    </div>
  </div>

<style>
</style>
