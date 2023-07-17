<script lang="ts">
import { onMount } from 'svelte';
import queryFlowMainChart from '../assets/queryflow_main_chart.avif';
import queryFlowNPMChart from '../assets/install_chart.avif'
onMount(() => {
  // functionality for the copy button on the top right of the query string code box
    const copyButton2: HTMLElement = document.getElementById(`copyButton`);
    copyButton2.addEventListener('click', function() {
      // Create a temporary textarea to select the text and copy
      const tempTextArea: HTMLTextAreaElement = document.createElement('textarea');
      tempTextArea.value = 'npm -install query-flow'
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);
    });
  });
</script>

<main>
  <section class="landing-background object-cover w-full h-full inset-0">
    <div class="landing-background-text">
      <h1>QueryFlow</h1>
      <p>Visualizing and Caching Slow Queries in Real-Time</p>
      <button class="get-started btn btn-lg btn-primary drawer-button border-primary m-8 hover:bg-secondary hover:text-white hover:border-secondary">Get started</button>
    </div>
  </section>
  <section class="transition-section">
  </section>
  <div class="flex justify-center items-center my-16">
    <h1 class="text-4xl font-bold">A Package And A Visualizer Working Together</h1>
  </div>

  <section class="grid md:grid-cols-2 sm:grid-cols-1 justify-center">
    <div class="flex justify-center">
      <div style="width: 600px;" class="rounded p-6" > 
        <div>
          <img class="w-10" src="https://cdn-icons-png.flaticon.com/512/25/25694.png"/>
        </div>
        
        <h1 class="text-2xl font-medium">An NPM Package designed to automatically cache your time-consuming queries into a Redis database for optimized performance.</h1>   
        <p class="pt-4"> The NPM package incorporates QueryFlow.autoCache, an automatic caching feature for middleware and backend operations. This tool analyzes database queries and, if the execution time exceeds a set threshold, stores the results in a Redis cache database. Developers input the SQL and Redis models, the query string, variables and values, caching speed threshold, and TTL. This results in faster future queries, as data is swiftly retrieved from the cache. Regardless of data source, QueryFlow.autoCache delivers the queried results seamlessly into the middleware's response cycle.

        </p>
      </div>
    </div>
  
    <div class=" flex justify-center">
      <div style="width: 600px;" class="rounded  p-6">
        <h1 class="text-2xl font-medium">Use a powerful visualization tool designed to analyze and interpret slow PostgreSQL queries</h1>   
        <p class="pt-4">QueryFlow is a tool designed to optimize the performance of PostgreSQL queries by mapping out planning, execution, and overall timing in comparison to other queries. It also provides a detailed table view showcasing shared, hit, and read blocks, facilitating the identification of performance deficiencies. Additionally, QueryFlow allows for comprehensive query comparisons and even offers a specific benchmarking feature against a Redis database. These capabilities make QueryFlow an essential tool for enhancing the performance of your PostgreSQL databases.</p>
      </div>
    </div>
  </section>
<section class="transition-container text-center flex items-center justify-center">
  <h1 class="text-4xl font-bold">Accelerating Your Database Queries, One Cache at a Time.</h1>
</section>
  <div class="mt-24 flex justify-center ">
    <img alt="queryFlow diagram" src={queryFlowNPMChart} />
  </div>
</main>



<style>
.transition-section {
  display:flex;
  justify-content: center;
  align-items: center;
  color:white;
  height: 30px;
  /* background: #112452; */
  background: linear-gradient(180deg, rgb(0, 0, 9) 0%, rgb(255, 255, 255) 100%);
	/* background: linear-gradient(181deg, rgba(2,0,36,1) 0%, rgba(121,9,93,1) 35%, rgba(87,0,255,1) 82%); */
  
}

.transition-section h3{
  font-size: 60px;
	font-weight: 500;
}

.landing-background{
  background-image: url('../assets/graph3.avif');
  background-size: cover;
  background-position: center;
  /* width: 100wh; scale up the div, you can change this to suit your needs */
  height: 85vh;
	background-repeat: no-repeat;
}
.landing-background-text{
  position: absolute;
  color:white;
  left: 10vw;
  top: 10vh;
}

.landing-background-text h1{
 font-size: 85px;
 font-weight: 500;
}
.landing-background-text p{
  font-size: 45px;
}
.transition-container{
  margin-top:50px;
  width:100vw;
  height:400px;
  background-image: linear-gradient(to right,var(--tw-gradient-stops));
  --tw-gradient-from:#002585;
  --tw-gradient-stops:var(--tw-gradient-from), var(--tw-graident-to,rgba(0,37,133,0));
  --tw-gradient-to: #209DEE;
  background-repeat:no-repeat;
}

/* .npm-package-container{
  height: 200px;
}
.npm-package-container h1{
  font-size: 45px;
} */
</style>



<!-- <div class="grid justify-center mt-4 npm-package-container">
  <h1>QueryFlow NPM Package </h1>
  <div class="flex rounded-md bg-slate-600 text-slate-100 h-10">
    <div class="ml-40 grid justify-center place-items-center">npm install query-flow</div>
    <button id="copyButton" class="ml-40 btn btn-square btn-sm right-0 top-0 text-lg bg-transparent border-none hover:bg-transparent">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
      </svg>
  </div>
</div> -->