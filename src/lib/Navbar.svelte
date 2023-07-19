<script lang="ts">
	import logo from '../assets/Query-Flow-icon.png';
	import { navigate } from 'svelte-routing';
	import { isAuthenticated } from '../store';
	import { onMount } from 'svelte';

	let revealNavDropdown = false;

	// hamburger menu collapses when clicking outside of it
	const toggleNavWindow = () => {
		revealNavDropdown = !revealNavDropdown;
			if (revealNavDropdown) {
			setTimeout(() => {
				window.addEventListener('click', () => {
					revealNavDropdown = false;
				}, {once: true})
			}, 0)
		}
	}
	
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

<div class="navbar bg-base-100 fixed top-0 z-20">

	<div class="flex-1">
		<a class="btn btn-ghost normal-case text-xl logo-text" href="/">
			<img src={logo} alt="logo" class="w-6 mt-1" />
			QueryFlow
		</a>
	</div>
	<div class="flex-none">
		<ul class="flex space-x-1 menu menu-horizontal text-lg">
      <li><a class="navtags active:shadow-xl active:ring active:ring-primary-100" href="/login">Home</a></li>
			<li><a class="navtags active:shadow-xl active:ring active:ring-primary-100" href="/about">About</a></li>
      <li><a class="navtags active:shadow-xl active:ring active:ring-primary-100" href="/tips">SQL Tips</a></li>
			<li><a class="navtags active:shadow-xl active:ring active:ring-primary-100" href="https://github.com/oslabs-beta/QueryFlow" target="_blank">GitHub</a></li>
			<li>
				{#if $isAuthenticated}
				<a on:click={logout} href="/login" class="navtags active:shadow-xl active:ring active:ring-primary-100">Logout</a>
				{:else}
				<button on:click={login} class="navtags btn-active btn-primary font-semibold active:shadow-xl active:ring active:ring-primary-100">Login</button>
				{/if}
			</li>
		</ul>
		<!-- {#if $isAuthenticated}
		<a on:click={logout} href="/login" class="navtags">Logout</a>
		{:else}
		<button on:click={login} class="navtags btn btn-primary">Login</button>
	{/if} -->
		<div id="hamburger-menu" class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
			<button on:click={toggleNavWindow} data-collapse-toggle="navbar-hamburger" type="button" class="inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
				<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
				</svg>
			</button>
			<div class={`${revealNavDropdown ? '' : 'hidden'} w-full`} style="position: fixed; top: 48px; right: 0px; z-index: 10;" id="navbar-hamburger">
				<ul class="flex flex-col font-medium mt-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
					<li>
						<a href="/" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" aria-current="page">Home</a>
					</li>
					<li>
						<a href="/about" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">About</a>
					</li>
					<li>
						<a href="/tips" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">SQL Tips</a>
					</li>
					<li>
						<a href="https://github.com/oslabs-beta/QueryFlow" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white" target="_blank">GitHub</a>
					</li>
					<li>
						{#if $isAuthenticated}
						<a on:click={logout} href="/login" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Logout</a>
						{:else}
						<a on:click={login} href="/login" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Login</a>
						{/if}
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	.navbar {
		border-bottom: 1px solid #cecece;
		background: rgba(255, 255, 255, 0.9)
	}

	#hamburger-menu {
		display: none;
	}
	@media only screen and (max-width: 800px) {
		#hamburger-menu {
			display: block;
		}
		.navtags {
			display: none;
		}
	}
</style>
