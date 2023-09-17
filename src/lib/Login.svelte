<script lang="ts">
	import { navigate } from 'svelte-routing';
	import { userInfoStore, renderSignup } from '../store';
	import { toasts } from 'svelte-toasts';

	let email: string;
	let password: string=''
	let wrongEmailPassword: boolean = false;
	
	// password visibility function

	let hidePassword: boolean = true;

	function toggleVisibility() {
		hidePassword = !hidePassword;
	}

	function updatePassword(event: any) {
		password = event.target.value;
	}
	// logging in POST Request
	const loginUser = async (e: any): Promise<void> => {
		e.preventDefault();
		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});
			if (response.ok) {
				const data = await response.json();
				toasts.success('', 'Successful Login', { placement: 'top-center' });
				localStorage.setItem('token', `${data.token}`);
				userInfoStore.set(data.userData);
				navigate('/home', { replace: true });
			}
			wrongEmailPassword = true;
			setTimeout(() => {
				wrongEmailPassword = false;
			}, 3000);
		} catch (error) {
			console.error(error);
		}
	};

	// google login get request
	const googleLogin = async (e: any): Promise<void> => {
		e.preventDefault();
		localStorage.removeItem('token');
		window.location.href = '/api/google-login';
	};
</script>

<!-- framework for login -->
<div
	style="height:100vh - 1px;"
	class="z-10 flex flex-col items-center justify-center px-6 pt-8 mx-9 mx-auto lg:py-0 max-w-96 login"
>
	<div
		class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
	>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8 login-shadow">
			{#if wrongEmailPassword}
				<div class="alert alert-warning">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/></svg
					>
					<span>Invalid email address/password!</span>
				</div>
			{/if}
			<h1
				class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
			>
				Login
			</h1>
			<form class="space-y-4 md:space-y-6" on:submit={loginUser} action="#">
				<div>
					<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Email</label
					>
					<input
						type="email"
						name="email"
						id="email"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="name@company.com"
						required
						bind:value={email}
					/>
				</div>
				<div class="relative">
					<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Password</label
					>
					<input
						type={hidePassword ? 'password' : 'text'}
						name="password"
						id="password"
						placeholder="••••••••"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
						value={password}
						on:input={updatePassword}
					/>
					<button
						type="button"
						on:click={toggleVisibility}
						class="absolute showPassword right-0 top-12 transform -translate-y-1/2 p-2"
					>
						<!-- {hidePassword ? 'Hide' : 'Show'} -->
						{#if hidePassword}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								fill="gre"
								class="bi bi-eye-slash"
								viewBox="0 0 16 16"
							>
								<path
									d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
								/>
								<path
									d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
								/>
								<path
									d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
								/>
							</svg>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								fill="gray"
								class="bi bi-eye"
								viewBox="0 0 16 16"
							>
								<path
									d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
								/>
								<path
									d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
								/>
							</svg>
						{/if}
					</button>
				</div>
				<button
					type="submit"
					class="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>Login</button
				>
			</form>
			<button
				on:click={() => {
					renderSignup.set(true);
				}}
				class="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>Sign Up
			</button>
			<hr class="w-2/3 mx-auto my-4" />
			<button
				type="button"
				on:click={googleLogin}
				class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2 w-full justify-center"
			>
				<svg
					class="w-4 h-4 mr-2"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 18 19"
				>
					<path
						fill-rule="evenodd"
						d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
						clip-rule="evenodd"
					/>
				</svg>
				Sign in with Google
			</button>
		</div>
	</div>
</div>

<style>
	.login {
		width: 407px;
	}
	@media (max-width: 640px) {
		.showPassword {
			margin-top:1px;
		}
	}
</style>
