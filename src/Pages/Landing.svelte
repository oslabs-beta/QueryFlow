<script lang="ts">
	import Login from '../lib/Login.svelte';
	import Signup from '../lib/Signup.svelte';
	import graph from '../assets/graph3.png';

  //toggle signup/login component
	let renderSignup: boolean = false;

</script>
<!-- background-image: {graph} -->
<div class="landing-container flex flex-col mt-5 lg:flex-row">
	<div class="flex-1 flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 responsive-column">
		<img class="landing-img w-full h-auto" src={graph} alt="graph" />
	</div>
	<!-- <div class="flex-1"> -->
		{#if renderSignup}
			<Signup bind:renderSignup />
		{:else}
			<Login bind:renderSignup />
		{/if}
	<!-- </div> -->
</div>

<style>
  .landing-img {
    width: 100%;
    height: 100%;
    object-fit: fit;
    border-radius: 15px; 
  }
  
  .landing-container{
    height:80vh
  }
  .responsive-column{
    height:90vh;
  }

  @media only screen and (max-width: 1025px) {
    .landing-img {
      display: none;
    }
  }
</style>
