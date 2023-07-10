<script lang="ts">
	import { navigate } from 'svelte-routing';
	import { userInfoStore } from '../store';
	
	
	export let renderSignup: boolean;

	let email: string;
	let password: string;
  let wrongEmailPassword:boolean = false

  // Login Function-POST Request
	const loginUser = async (e: any) => {
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
        localStorage.setItem("token",`${data.token}`)
				userInfoStore.set(data.userData);
				navigate('/home', { replace: true });
			}
      wrongEmailPassword=true;
      setTimeout(()=>{
        wrongEmailPassword=false
      },3000)
		} catch (error) {
      
      console.error(error)
    }
	};

  //google login
  const googleLogin = async (e:any) => {
    e.preventDefault();
    localStorage.removeItem("token")
		window.location.href = ('/api/google-login')	
  }
</script>



<!-- //   try 
// 		const response = await fetch('/api/google-login',{
//       method:'GET',
//       mode: 'no-cors',
//       headers: {
// 				'Content-Type': 'application/json',
// 			},
//     })
//     const data = await response.json();
//     console.log('i am data',data)
// }catch(error){

// } -->

<!-- framework for login -->
<div class="flex flex-col items-center justify-center px-6 py-8 mx-9 mx-auto md:h-full lg:py-0 w-96 login">
	<div
		class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 "
	>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8 login-shadow">
      {#if wrongEmailPassword}
      <div class="alert alert-warning">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
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
				<div>
					<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Password</label
					>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="••••••••"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
						bind:value={password}
					/>
				</div>

				<button
					type="submit"
					class="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>Login</button
				>
			</form>
			<button
				on:click={() => {
					renderSignup = true;
				}}
				class="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>Sign Up</button
			>
      <button type="button" on:click={googleLogin} class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
        <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
          <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
        </svg>
        Sign in with Google
      </button>
		</div>
	</div>
</div>

<style>
  .login{
    width:496px;   
  } 
</style>
