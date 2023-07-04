<script lang="ts">
	import Login from '../lib/Login.svelte';
	import Signup from '../lib/Signup.svelte';
	import graph from '../assets/graph.jpg';

	let renderSignup: boolean = false;
</script>

<div class="md:h-full ">
	<div class="grid sm:grid-cols-1 md:grid-cols-2 mt-16">
		<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
			<img src={graph} alt="graph" />
		</div>
		{#if renderSignup}
			<Signup bind:renderSignup />
		{:else}
			<Login bind:renderSignup />
		{/if}
	</div>
</div>
