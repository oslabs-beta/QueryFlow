<script lang="ts">
	import Drawer from '../lib/Drawer.svelte';
	import Metrics from '../lib/Metrics.svelte';
	import { get } from 'svelte/store';
	import { userInfoStore, metricData } from '../store'
	import { onMount, onDestroy } from 'svelte';
	
	let userInfo = get(userInfoStore);
	console.log('user info in home', userInfo);

	export let metrics = [];

	metricData.subscribe(data => {
		metrics = data;
	});
  
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

    <div class="mt-8 grid sm:grid-cols-1 md:grid-cols-2 gap-9 justify-center content-center">
			<!-- ADD STUFF HERE -->
      {#each metrics as metric, i} 
        <Metrics {i} {metric} />
      {/each}
    </div>
  </div>

<style>
</style>
