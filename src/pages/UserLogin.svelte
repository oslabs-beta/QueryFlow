<script lang="ts">
	import Login from '../lib/Login.svelte';
	import Signup from '../lib/Signup.svelte';
	import loginPic from '../assets/login-background-img.avif';
	import { navigate } from 'svelte-routing';
	import { onMount } from 'svelte';

	// used for rendering signup component vs. login component
	let renderSignup: boolean = false;

	onMount(async () => {
		if (localStorage.getItem('token')) navigate('/home', { replace: true });
	});
</script>

<div class="landing-login-container flex flex-col mt-5 lg:flex-row">
	<div
		class="flex-1 flex items-center justify-center flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 responsive-column"
	>
		<img class="object-contain rounded-lg" src={loginPic} alt="graph" />
	</div>
	
	<!-- renders signup/login component -->
	<div class="flex items-center">
		{#if renderSignup}
			<Signup bind:renderSignup />
		{:else}
			<Login bind:renderSignup />
		{/if}
	</div>
</div>

<style>

	.landing-login-container {
		height: 80vh;
	}
	.responsive-column {
		height: 90vh;
	}

	@media only screen and (max-width: 1025px) {
		.landing-login-container img {
			display: none;
		}
	}
</style>
