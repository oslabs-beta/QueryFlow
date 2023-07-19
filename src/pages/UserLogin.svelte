<script lang="ts">
	import Login from '../lib/Login.svelte';
	import Signup from '../lib/Signup.svelte';
	import flowBackground from "../assets/flow-background.jpg"
	import { navigate } from 'svelte-routing';
	import { onMount } from 'svelte';

	// used for rendering signup component vs. login component
	let renderSignup: boolean = false;
	onMount(async () => {
		if (localStorage.getItem('token')) navigate('/home', { replace: true });
	});
</script>

<div class="fill-remaining-space flex items-center justify-center">
	<img class="fixed top-0 min-h-full min-w-full" src={flowBackground} alt="flowing rays of light" />
	<!-- renders signup/login component -->
	{#if renderSignup}
		<Signup bind:renderSignup />
	{:else}
		<Login bind:renderSignup />
	{/if}
</div>

<style>
	.fill-remaining-space {
	min-height: calc(100vh - 4rem);
}
</style>
