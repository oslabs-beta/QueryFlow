<script lang="ts">
	import logo from '../assets/Query-Flow-icon.png';
	import { navigate } from 'svelte-routing';
	import {
		isAuthenticated,
		isLoading,
		renderSignup,
		metricData,
		filterMetricData,
		filterMetricDataTwo,
	} from '../store';
	import { onMount } from 'svelte';
	import { toasts } from 'svelte-toasts';

	let revealNavDropdown: boolean = false;
	// hamburger menu collapses when clicking outside of it
	const toggleNavWindow = () => {
		revealNavDropdown = !revealNavDropdown;
		if (revealNavDropdown) {
			setTimeout(() => {
				window.addEventListener(
					'click',
					() => {
						revealNavDropdown = false;
					},
					{ once: true }
				);
			}, 0);
		}
	};

	// removes tokens to exit auth status
	const logout = async (e: any): Promise<void> => {
		e.preventDefault();
		toasts.success('', 'Successful Logout', { placement: 'top-center' });
		localStorage.removeItem('token');
		const revoke = localStorage.getItem('revoke');
		if (revoke) {
			const revokeURL = `https://accounts.google.com/o/oauth2/revoke?token=${revoke}`;
			await fetch(revokeURL);
			localStorage.removeItem('revoke');
		}
		metricData.set([]);
		filterMetricData.set([]);
		filterMetricDataTwo.set([]);
		isAuthenticated.set(false);
		navigate('/login', { replace: true });
	};

	// using this for some on:click methods
	const login = async (): Promise<void> => {
		renderSignup.set(false);
		navigate('/login');
	};

	onMount(() => {
		if (localStorage.getItem('token')) {
			isAuthenticated.set(true);
		}

		// y
		// adds/removes spinning animation when a query begins/finishes running
		isLoading.subscribe((value: boolean): void => {
			if (value) document.getElementById('logo').classList.add('animate-spin');
			else document.getElementById('logo').classList.remove('animate-spin');
		});
	});
</script>

<div class="h-16 navbar bg-base-100 fixed top-0 z-20">
	<div class="flex-1">
		<p
			class="btn btn-ghost normal-case text-xl logo-text"
			on:keydown={() => {
				navigate('/');
			}}
			on:click={() => {
				navigate('/');
			}}
		>
			<img id="logo" src={logo} alt="logo" class="w-6 mt-1" />
			QueryFlow
		</p>
	</div>
	<div class="flex-none">
		<ul class="flex space-x-1 menu menu-horizontal text-lg">
			<li>
				<p
					class="navtags active:shadow-xl active:ring active:ring-primary-100"
					on:keydown={() => {
						navigate('/login');
					}}
					on:click={() => {
						navigate('/login');
					}}
				>
					Home
				</p>
			</li>
			<li>
				<p
					class="navtags active:shadow-xl active:ring active:ring-primary-100"
					on:keydown={() => {
						navigate('/about');
					}}
					on:click={() => {
						navigate('/about');
					}}
				>
					About
				</p>
			</li>
			<li>
				<p
					class="navtags active:shadow-xl active:ring active:ring-primary-100"
					on:keydown={() => {
						navigate('/tips');
					}}
					on:click={() => {
						navigate('/tips');
					}}
				>
					SQL Tips
				</p>
			</li>
			<li>
				<a
					class="navtags active:shadow-xl active:ring active:ring-primary-100"
					href="https://github.com/oslabs-beta/QueryFlow"
					target="_blank">GitHub</a
				>
			</li>
			<li>
				{#if $isAuthenticated}
					<a
						on:click={logout}
						href="/login"
						class="navtags active:shadow-xl active:ring active:ring-primary-100">Logout</a
					>
				{:else}
					<button
						on:click={login}
						class="navtags btn-active btn-primary font-semibold active:shadow-xl active:ring active:ring-primary-100"
						>Login</button
					>
				{/if}
			</li>
		</ul>
		<div
			id="hamburger-menu"
			class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4"
		>
			<button
				on:click={toggleNavWindow}
				data-collapse-toggle="navbar-hamburger"
				type="button"
				class="inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				aria-controls="navbar-hamburger"
				aria-expanded="false"
			>
				<svg
					class="w-5 h-5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 17 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 1h15M1 7h15M1 13h15"
					/>
				</svg>
			</button>
			<div
				class={`${revealNavDropdown ? '' : 'hidden'} w-full`}
				style="position: fixed; top: 48px; right: 0px; z-index: 10;"
				id="navbar-hamburger"
			>
				<ul class="flex flex-col font-medium mt-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
					{#if $isAuthenticated}
						<!-- replacing (on:click=navigate) with (href=/all-metrics) here breaks the navigation -->
						<li>
							<p
								on:keydown={() => {
									navigate('/login');
								}}
								on:click={() => {
									navigate('/login');
								}}
								class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								aria-current="page"
							>
								Home
							</p>
						</li>
						<li>
							<p
								on:keydown={() => {
									navigate('/all-metrics');
								}}
								on:click={() => {
									navigate('/all-metrics');
								}}
								class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								aria-current="page"
							>
								All Metrics
							</p>
						</li>
					{/if}
					<li>
						<p
							on:keydown={() => {
								navigate('/about');
							}}
							on:click={() => {
								navigate('/about');
							}}
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							About
						</p>
					</li>
					<li>
						<p
							on:keydown={() => {
								navigate('/tips');
							}}
							on:click={() => {
								navigate('/tips');
							}}
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
						>
							SQL Tips
						</p>
					</li>
					<li>
						<a
							href="https://github.com/oslabs-beta/QueryFlow"
							class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
							target="_blank">GitHub</a
						>
					</li>
					<li>
						{#if $isAuthenticated}
							<a
								on:click={logout}
								href="/login"
								class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								>Logout</a
							>
						{:else}
							<a
								on:click={login}
								href="/login"
								class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								>Login</a
							>
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
		background: rgba(255, 255, 255, 0.9);
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
