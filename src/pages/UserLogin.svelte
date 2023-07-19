<script lang="ts">
	import Login from '../lib/Login.svelte';
	import Signup from '../lib/Signup.svelte';
	import loginPic from '../assets/landing-background-img.avif';
	import { navigate } from 'svelte-routing';
	import { onMount } from 'svelte';
	// toggle signup/login component
	let renderSignup: boolean = false;

	onMount(async () => {
		if (localStorage.getItem('token')) navigate('/home', { replace: true });
	});
</script>

<div class="landing-login-container items-center flex flex-col mt-5 lg:flex-row">
	<div
		class="flex-1 flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 responsive-column"
	>
		<img style="max-height: 80vh;" class="object-contain rounded-lg" src={loginPic} alt="graph" />
	</div>
	<!-- conditional statement to render signup or login -->
	{#if renderSignup}
		<Signup bind:renderSignup />
	{:else}
		<Login bind:renderSignup />
	{/if}
</div>

<style>

	.responsive-column {
		height: 90vh;
	}

	@media only screen and (max-width: 1025px) {
		.landing-login-container img {
			display: none;
		}
	}
</style>
