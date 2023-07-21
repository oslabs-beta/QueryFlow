<script lang="ts">
import { onMount } from 'svelte';
import queryFlowMainChart from '../assets/queryflow_main_chart.avif';
import queryFlowNPMChart from '../assets/install_chart.avif'
import averageQueryMetrics from '../assets/average_query_metrics.avif'
import barSingleMetrics from '../assets/bar_query_metrics.avif'
import scatterSingleMetrics from '../assets/scatter_query_metrics.avif'
import vivek from '../assets/vivek_profile.avif'
import george from '../assets/george_profile.avif'
import ryan from '../assets/ryan_profile.avif'
import niko from '../assets/niko_profile.avif'
import philip from '../assets/philip_profile.avif'
import { Carousel,Card, Modal, Avatar, Tooltip} from 'flowbite-svelte'
import { navigate } from 'svelte-routing';
import packageIcon from '../assets/package.avif'
import registryEditor from '../assets/registry-editor_hires.avif'
import queryFlowGif from '../assets/queryflow_gif3.gif'
//boolean for modal
let clickOutsideModal:boolean = false;

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

// images for carousel
export const images = [
  {
    id: 0,
    name: "Average Query Metrics",
    imgurl: averageQueryMetrics,
    attribution: "Average Query Metrics",
  },
  {
    id: 1,
    name: "Single Metrics Bar Graph",
    imgurl: barSingleMetrics,
    attribution: "Single Metrics Bar Graph",
  },
  {
    id: 2,
    name: "Single Metrics Scatter Graph",
    imgurl: scatterSingleMetrics,
    attribution: "Single Metrics Scatter Graph",
  },
]

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
      <button class="get-started btn btn-lg btn-primary drawer-button border-primary m-8 hover:bg-secondary hover:text-white hover:border-secondary font-semibold" on:click={() => navigate('/login')}>Get started</button>
    </div>
  </section>
<section class="transition-section">
  </section>
  <div class="flex justify-center items-center my-16">
    <h1 class="text-4xl font-bold text-center">A Package And A Visualizer Working Together</h1>
  </div>

 <section class="grid md:grid-cols-2 sm:grid-cols-1 justify-center">
    <div class="flex justify-center">
      <div class="rounded p-6 top-column" > 
        <div class="icon-div">
          <img class="icon" alt="package" src={packageIcon}/>
        </div>
        <h1 class="text-2xl font-medium">An NPM Package designed to automatically cache slow queries into a Redis database.</h1>   
        <p class="pt-4"> The NPM package incorporates QueryFlow.autoCache, an automatic caching feature for middleware and backend operations. This tool analyzes database queries and, if the execution time exceeds a set threshold, stores the results in a Redis cache database. Developers input the SQL and Redis models, the query string, variables and values, caching speed threshold, and TTL. This results in faster future queries, as data is swiftly retrieved from the cache. Regardless of data source, QueryFlow.autoCache delivers the queried results seamlessly into the middleware's response cycle.
        </p>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="rounded p-6 top-column">
        <div class="icon-div">
          <img class="icon" alt="graph" src={registryEditor}/>
        </div>
        <h1 class="text-2xl font-medium">Use our powerful visualization tool to analyze and interpret slow PostgreSQL queries</h1>   
        <p class="pt-4">QueryFlow is a tool designed to optimize the performance of PostgreSQL queries by mapping out planning, execution, and overall timing in comparison to other queries. It also provides a detailed table view showcasing shared, hit, and read blocks, facilitating the identification of performance deficiencies. Additionally, QueryFlow allows for comprehensive query comparisons and even offers a specific benchmarking feature against a Redis database. These capabilities make QueryFlow an essential tool for enhancing the performance of your PostgreSQL databases.</p>
      </div>
    </div>
  </section> 

<section class="transition-container text-center flex items-center justify-center">
  <h1 class=" text-white text-4xl font-bold">Accelerating Your Database Queries, One Cache at a Time.</h1>
</section>
<section>
  <div class="grid justify-center mt-4 npm-package-container text-center">
    <h1 class="text-4xl font-bold mt-10 mb-4">QueryFlow NPM Package </h1>
    <div class="mt-10 flex rounded-md bg-slate-600 text-slate-100 h-10 justify-between items-center npm-install">
      <h6 class="font-bold p-2">$</h6>
      <div class="codeText grid justify-center place-items-center font-bold">npm install queryflow.js</div>
      

        <button id="copyButton" class="btn btn-square btn-sm bg-transparent border-0 hover:bg-transparent p-0 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
          </svg>
      </button>
      <Tooltip>copy</Tooltip>
      
  </div>
</div>
<div class="mt-12 flex justify-center ">
    <img alt="NPM install diagram" src={queryFlowNPMChart} />
  </div>
</section>
<section class="text-4xl font-bold transition-container2 text-center flex items-center justify-center">
  <h1 class="text-white text-4xl font-bold">Here Is How Auto Cache Works!</h1>
</section>
<section class="grid justify-center text-center ">
  <div class="mt-4 flex justify-center ">
    <button on:click={() => clickOutsideModal = true}>
      <img alt="queryFlow diagram" class="cursor-pointer" src={queryFlowMainChart} />
    </button>
    <Modal size="xl" bind:open={clickOutsideModal} autoclose outsideclose>
      <img alt="queryFlow diagram" class="cursor-pointer" src={queryFlowMainChart} />
    </Modal>
  </div>
</section>
<section class="text-4xl font-bold transition-container3 text-center flex items-center justify-center">
  <h1 class="text-white text-4xl font-bold">Let's dive into the features of our Visualizer!</h1>
</section>
<section class="flex justify-center">
  <img src={queryFlowGif} alt="queryflow visualizer gif">
</section >
<section class="text-4xl font-bold transition-container4 text-center flex items-center justify-center">
  <div class="horizontal-line"></div>
</section>
<section class="flex carousel-container">
  <div class="grid md:grid-cols-2 sm:grid-cols-1 justify-center">
    <div class="max-w-4xl carousel-container flex justify-center">
      <Carousel divClass="overflow-auto" {images} loop showCaptions={false} classIndicatorDiv="bottom-0" showThumbs={false} duration="8000" />
    </div>
    
    <div class="p-6">
      <h1 class="text-2xl xl:text-4xl font-bold">Explore your slow queries from various perspectives.</h1>
     
      <p class="mt-2 xl:text-lg">With the QueryFlow Visualizer, you have the flexibility to analyze your slow queries in a variety of ways. It enables you to juxtapose various SQL query strings using interactive graphs and detailed tables. This tool provides comprehensive visualization of execution time, planning time, and average time for all your queries, enhancing your understanding and aiding in optimization.</p>
    
      <h1 class="text-2xl xl:text-4xl font-bold mt-4">Side by side query comparisons</h1>
      <p class="mt-2 xl:text-lg">
        QueryFlow optimizes your SQL queries by offering performance comparisons and a global metrics chart for an overview of all your queries. Our standout feature, done with your consent, benchmarks your queries against Redis performance, showcasing caching benefits. You can leverage these insights using our NPM package, enabling seamless, dynamic caching for your application.</p>
      <div class="flex justify-center mt-4">
    <button class="btn btn-warning text-base" on:click={() => navigate('/login')}>Try it Today</button>
      </div>
    </div>
  </div>
</section>
<section class="meet-team text-center">
  <h1 class="text-4xl font-bold py-4">Meet the team</h1>
  <div class="grid grid-cols-5 gap-4 justify-around items-center h-60"> 
    <Card padding='sm' class="hover:shadow-lg hover:-translate-y-2 transition ease-in-out delay-200 bg-transparent border-none shadow-2xl">
      <div class="flex flex-col items-center pb-4">
        <Avatar size="xl" src={george} />
        <h5 class="mb-1 text-xl font-medium text-gray-100 dark:text-white">George Greer</h5>
        <span class="text-sm text-gray-100 dark:text-gray-400">Software Engineer</span>
        <div class="flex gap-2 mt-2">
          <a class="text-gray-100" href="https://github.com/ggreer91" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg></a>
          <a class="text-gray-100" href="https://www.linkedin.com/in/george-greer/" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
          </svg></a>
        </div>
      </div>
    </Card>
    <Card padding='sm' class="hover:shadow-lg hover:-translate-y-2 bg-transparent shadow-lg border-none shadow-2xl transition ease-in-out delay-200 ">
      <div class="flex flex-col items-center pb-4">
        <Avatar size="xl" src={vivek} />
        <h5 class="mb-1 text-xl font-medium text-gray-100 dark:text-white">Vivek Patel</h5>
        <span class="text-sm text-gray-100 dark:text-gray-400">Software Engineer</span>
        <div class="flex gap-2 mt-2">
          <a class="text-gray-100" href="https://github.com/vkpatel007" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg></a>
          <a class="text-gray-100" href="https://www.linkedin.com/in/vivekpatel607" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
          </svg></a>
        </div>
      </div>
    </Card>
    <Card padding='sm' class="hover:shadow-lg hover:-translate-y-2 bg-transparent border-none shadow-2xl transition ease-in-out delay-200 ">
      <div class="flex flex-col items-center pb-4">
        <Avatar size="xl" src={niko} />
        <h5 class="mb-1 text-xl font-medium text-gray-100 dark:text-white">Niko Amescua</h5>
        <span class="text-sm text-gray-100 dark:text-gray-400">Software Engineer</span>
        <div class="flex gap-2 mt-2">
          <a class="text-gray-100" href="https://github.com/NikoAmescua" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg></a>
          <a class="text-gray-100" href="https://www.linkedin.com/in/nikoamescua" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
          </svg></a>
        </div>
      </div>
    </Card>
    <Card padding='sm' class="hover:shadow-lg hover:-translate-y-2 bg-transparent shadow-lg border-none shadow-2xl transition ease-in-out delay-200 ">
      <div class="flex flex-col items-center pb-4">
        <Avatar size="xl" src={ryan} />
        <h5 class="mb-1 text-xl font-medium text-gray-100 dark:text-white">Ryan Campbell</h5>
        <span class="text-sm text-gray-100 dark:text-gray-400">Software Engineer</span>
        <div class="flex gap-2 mt-2">
          <a class="text-gray-100" href="https://github.com/cronullarc" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg></a>
          <a class="text-gray-100" href="https://www.linkedin.com/in/ryancampbelladr/" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
          </svg></a>
        </div>
      </div>
    </Card>
    <Card padding='sm' class="hover:shadow-lg hover:-translate-y-2 bg-transparent shadow-lg border-none shadow-2xl transition ease-in-out delay-200 ">
      <div class="flex flex-col items-center pb-4">
        <Avatar size="xl" src={philip} />
        <h5 class="mb-1 text-xl font-medium text-gray-100 dark:text-white">Philip Brown</h5>
        <span class="text-sm text-gray-100 dark:text-gray-400">Software Engineer</span>
        <div class="flex gap-2 mt-2">
          <a class="text-gray-100" href="https://github.com/starfishpanda" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg></a>
          <a class="text-gray-100" href="https://www.linkedin.com/in/philiplbrown/" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
          </svg></a>
        </div>
        </div>
    </Card>
  </div>
</section>
<section>
  <div class="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
    <span class="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2023 <a href="https://www.query-flow.com">QueryFlow™</a>. All Rights Reserved.
    </span>
    <div class="flex mt-4 space-x-5 sm:justify-center md:mt-0">
        <a href="https://www.facebook.com/profile.php?id=100094996360163&is_tour_dismissed=true" class="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                    <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                </svg>
              <span class="sr-only">Facebook page</span>
          </a>
          <a href="https://twitter.com/Query_Flow" class="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
            </svg>
              <span class="sr-only">Twitter page</span>
          </a>
          <a href="https://github.com/oslabs-beta/QueryFlow" class="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
              </svg>
              <span class="sr-only">GitHub account</span>
          </a>
    </div>
</section>
</main>

<style>
.icon-div {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 5px;
}

.icon {
  width: 50px;
  padding: 5px;
}

.transition-section {
  display:flex;
  justify-content: center;
  align-items: center;
  color:white;
  height: 30px;
  background: linear-gradient(180deg, rgb(0, 0, 9) 0%, rgb(255, 255, 255) 100%);
}


.landing-background{
  background-image: url('../assets/graph3.avif');
  background-size: cover;
  background-position: center;
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
  height:200px;
  background-image: linear-gradient(to right,var(--tw-gradient-stops));
  --tw-gradient-from:#7b6a96;
  --tw-gradient-stops:var(--tw-gradient-from), var(--tw-graident-to,#6444c2);
  --tw-gradient-to: #7e4397;
  background-repeat:no-repeat;
}
.transition-container2{
  margin-top:50px;
  width:100vw;
  height:200px;
  background-image: linear-gradient(to right,var(--tw-gradient-stops));
  --tw-gradient-from:#7e4397;
  --tw-gradient-stops:var(--tw-gradient-from), var(--tw-graident-to,#7b6a96);
  --tw-gradient-to: #209DEE;
  background-repeat:no-repeat;
}
.transition-container3{
  margin-top:50px;
  width:100vw;
  height:200px;
  background-image: linear-gradient(to right,var(--tw-gradient-stops));
  --tw-gradient-from:#9347A6ff ;
  --tw-gradient-stops:var(--tw-gradient-from), var(--tw-graident-to,#5a8fba);
  --tw-gradient-to: #5a8fba;
  background-repeat:no-repeat;
}

.transition-container4{
  width:100vw;
  height:150px;
}

.horizontal-line{
  height:2px;
  width:50%;
  background-color: rgba(181, 181, 181, 0.303);
  border-radius: 25px;
}

.meet-team{
  margin-top:50px;
  width:100vw;
  height:400px;

  background-image: linear-gradient(to right,var(--tw-gradient-stops));
  --tw-gradient-from:#535cd2;
  --tw-gradient-stops:var(--tw-gradient-from), var(--tw-graident-to,rgb(136, 110, 182));
  --tw-gradient-to: rgb(118, 104, 163);
  background-repeat:no-repeat;
}

@media (max-width: 640px) {
  .meet-team {
    display: flex;
    flex-direction: column;
    align-items: center;
    height:1550px;
  }
  .grid-cols-5 {
    grid-template-columns: 1fr;
  }
  .landing-background-text{
    margin-right:5px;
  }
  .landing-background-text h1 {
    font-size: 60px;
  }
  .landing-background-text p {
    font-size: 40px;
  }
  .get-started {
    padding: 12px 24px;
    font-size: 16px;
  }
}

@media (min-width: 1200px) {
  .top-column{
    width:600px;
  }
}
@media (max-width: 430px) {
  .landing-background-text{
    margin-right:5px;
    margin-top:30px;
  }
}

@media (max-width: 440px) {
  .npm-install{
    margin-left:10px;
    margin-right:10px;
  }
}
@media only screen and (min-width: 641px) and (max-width: 1070px) {
  .meet-team {
    display: flex;
    flex-direction: column;
    align-items: center;
    height:720px;
  }

  .grid-cols-5 {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .grid-cols-5 > div {
    flex: 1 0 calc(50% - 10px);
    margin: 5px; 
  }
}
</style>



