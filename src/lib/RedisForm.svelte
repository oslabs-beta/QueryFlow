<script lang='ts'>
  import { onMount } from 'svelte';
  import RedisChart from '../Graphs/RedisChart.svelte'
  import { redisData } from '../store';
  import type { RedisData } from '../types';

  let uri:string = '';
  let queryString:string = '';
  let metricRun:boolean = false

  let redisMetrics:RedisData;

  // if store changes then redo the redisMetrics variable
  redisData.subscribe((data) => {
  redisMetrics = data;
});

  const getRedisData:Function = async () => {

    const response = await fetch('/api/redis-metrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uri: `${uri}`, queryString: `${queryString}`}),
    });

    if (response.ok) {
      const result = await response.json();
      metricRun=true;
      redisData.set({
        totalTime: Number(result.totalTime),
        totalTimeQuery: Number(result.totalTimeQuery),
      })
      console.log('i am the result in the post request',result)
      console.log('i am the result in the redis metrics in the form',redisMetrics)
    } 
  };
</script>

<style>

</style>

<main>
  <h1 class="text-lg text-black font-bold">Redis -v- PostgreSQL Performance</h1>
  <div>
  <form on:submit|preventDefault={()=>getRedisData()}>
    
      <div class="w-full my-2">
        <label
          for="queryName"
          class="block mb-2 text-lg font-medium"
        >
        URI String
        </label>
        <input
          type="text"
          name="queryName"
          id="queryName"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="e.g. My query"
          bind:value={uri}
        />
      </div>
<div>
  <div class="w-full my-2">
    <label
      for="queryString"
      class="block mb-2 text-lg font-medium"
    >
    Query String
    </label>
    <textarea
      name="queryString"
      id="queryString"
      bind:value={queryString}
      placeholder="e.g. SELECT * FROM your_table"
      class="textarea textarea-bordered textarea-lg w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  </div>
</div>

    <button class="btn btn-primary" type="submit">Return Metrics</button>
  </form>
</div>
  {#if metricRun}
    <div class="justify-center text-black my-2">
      <h2 class="font-bold">Performance Metrics</h2>
      <p>PostgreSQL Total Time: {redisMetrics.totalTimeQuery} milliseconds</p>
      <p>Redis Total Time: {redisMetrics.totalTime} milliseconds</p>
    </div>
    <!-- Rerender the redisChart everytime new values are inputed and the redisStore/Array changes -->
    {#key redisMetrics}
    <RedisChart/>
    {/key}
  {/if}

</main>