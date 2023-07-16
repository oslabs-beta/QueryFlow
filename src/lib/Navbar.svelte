<script lang="ts">
	import logo from '../assets/QueryFlow-icon.avif';
	import { navigate } from 'svelte-routing';
	import { isAuthenticated } from '../store';
	import { onMount } from 'svelte';

	const logout = async () => {
		localStorage.removeItem('token');
		const revoke = localStorage.getItem('revoke');
		if (revoke) {
			const revokeURL = `https://accounts.google.com/o/oauth2/revoke?token=${revoke}`;
			await fetch(revokeURL);
			localStorage.removeItem('revoke');
		}
		isAuthenticated.set(false);
		navigate('/login', { replace: true });
	};

	const login = async () => {
		navigate('/login')
	}

	onMount(()=>{
		if (localStorage.getItem('token')){
			isAuthenticated.set(true)  
		}   
	})

	
</script>

<div class="navbar bg-base-100 fixed top-0 z-10">

	<div class="flex-1">
		<a class="btn btn-ghost normal-case text-xl logo-text" href="http://localhost:5173/">
			<img src={logo} alt="logo" width="26px" />
			QueryFlow
		</a>
	</div>
	<div class="flex-none">
		<a class="navtags" href="/login">App</a>
		<a class="navtags" href="/about">About</a>
		<a class="navtags" href="/tips">SQL Tips</a>
		<a class="navtags" href="https://github.com/oslabs-beta/QueryFlow" target="_blank">GitHub</a>

		


		<!-- 3-dot button in top-right corner, replace all navtags with this on smaller screens -->
		
		<!-- <button class="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
        </path>
      </svg>
    </button> -->
		

			<!-- <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<button data-collapse-toggle="navbar-hamburger" type="button" class="inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
					<span class="sr-only">Open main menu</span>
					<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
					</svg>
				</button>
				<div class="hidden w-full" id="navbar-hamburger">
					<ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
						<li>
							<a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded dark:bg-blue-600" aria-current="page">Home</a>
						</li>
						<li>
							<a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Services</a>
						</li>
						<li>
							<a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">Pricing</a>
						</li>
						<li>
							<a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Contact</a>
						</li>
					</ul>
				</div>
			</div> -->
		




		{#if $isAuthenticated}
		<button on:click={logout} class="btn btn-active btn-primary">Logout</button>
		{:else}
		<button on:click={login} class="btn btn-secondary btn-primary">Login</button>
	{/if}
	</div>
</div>

<style>
	.navbar {
		border-bottom: 1px solid #cecece;
	}

	.navtags {
		margin-right: 25px;
	}
</style>
