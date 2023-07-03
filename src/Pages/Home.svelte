<script lang="ts">
	import Drawer from '../lib/Drawer.svelte';
	import { get } from 'svelte/store';
	import { userInfoStore, metricData } from '../store';
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
    fetchData()
	})
  
	// send a query to backend
</script>

<div class="flex flex-col items-center justify-center">
	<Drawer userId={userInfo._id} />
	<div class="container">
    <div class="grid grid-col-3">
			<!-- ADD STUFF HERE -->
			<p>{metrics.length}</p>
    </div>
  </div>
</div>

<style>
</style>
