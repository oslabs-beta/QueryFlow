<script lang="ts">
	import Login from '../lib/Login.svelte';
	import Signup from '../lib/Signup.svelte';
	import loginPic from '../assets/login-background-img.avif';
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
	<img class="w-12 absolute h-full w-full top-0" src={flowBackground} alt="flowing rays of light" />
	<!-- conditional statement to render signup or login -->
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
