<script lang="ts">
	import { navigate } from 'svelte-routing';

	// initializing vars for database
	let first_name: string;
	let last_name: string;
	let organization: string;
	let database: string;
	let email: string;
	let password: string;

	export let renderSignup: boolean;

	let confirmPassword: string;

	// post request for signing up
	const postData = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) return alert('Please make sure your passwords match');

		const body = database
			? { first_name, last_name, organization, database, email, password }
			: { first_name, last_name, organization, email, password };
		// console.log(body);
		try {
			const response = await fetch('/api/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});
      console.log(response);
      console.log('i am the response.ok', response.ok);
			if (response.ok) {
      
				alert('account created');
				renderSignup = false;
			} else {
				// need error here
			}
		} catch (error) {}
	};
</script>

<!-- ===== add modifications to <section> for smaller screens, not just class='flex items-center', which works only for big screens ===== -->
<section>
	<!-- <div class="toast toast-top toast-center">
    <div class="alert alert-success">
      <span>Message sent successfully.</span>
    </div>
  </div> -->
	<div class="flex flex-col px-6 mx-auto lg:py-0">
		<div
			class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
		>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<div class="flex items-center">
					<button
						on:click={() => {
							renderSignup = false;
						}}
						type="button"
						class="text-primary border-2 border border-primary hover:bg-secondary hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center dark:border-primary dark:text-primary dark:hover:text-primary dark:focus:ring-blue-800 dark:hover:bg-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							stroke="currentColor"
							viewBox="0 0 24 24"
							stroke-width="2"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
							/>
						</svg>
					</button>
					<h1
						class="ml-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
					>
						Sign up
					</h1>
				</div>

				<form class="space-y-4 md:space-y-6" action="#" on:submit={postData}>
					<div class="flex flex-wrap -mx-3 mb-6">
						<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								for="grid-first-name"
							>
								First Name
								<span class="asterisk">*</span>
							</label>
							<input
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								id="grid-first-name"
								type="text"
								placeholder="Jane"
								required
								bind:value={first_name}
							/>
							<!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
						</div>
						<div class="w-full md:w-1/2 px-3">
							<label
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								for="grid-last-name"
							>
								Last Name
								<span class="asterisk">*</span>
							</label>
							<input
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								id="grid-last-name"
								type="text"
								placeholder="Doe"
								required
								bind:value={last_name}
							/>
						</div>
					</div>
					<div>
						<label
							for="organization"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Organization (optional)</label
						>
						<input
							type="text"
							name="organization"
							id="organization"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="e.g. TSM"
							bind:value={organization}
						/>
					</div>
					<div class="inline-block relative w-64">
						<label
							for="database"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Preferred Database (optional)</label
						>
						<select
							bind:value={database}
							name="database"
							id="database"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						>
							<option value="" disabled selected hidden>Please choose...</option>
							<option>PSQL</option>
							<option>MySQL</option>
							<option>Redis</option>
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
						>
							<svg
								class="fill-current h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								><path
									d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
								/></svg
							>
						</div>
					</div>
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Your email
							<span class="asterisk">*</span>
						</label>
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
						<label
							for="password"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Password
							<span class="asterisk">*</span>
						</label>
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
					<div>
						<label
							for="confirm-password"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Confirm password
							<span class="asterisk">*</span>
						</label>
						<input
							type="password"
							name="confirm-password"
							id="confirm-password"
							placeholder="••••••••"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
							bind:value={confirmPassword}
						/>
					</div>
					<div class="flex items-start">
						<div class="flex items-center h-5">
							<input
								id="terms"
								aria-describedby="terms"
								type="checkbox"
								class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
								required
							/>
						</div>
						<div class="ml-3 text-sm">
							<label for="terms" class="font-light text-gray-500 dark:text-gray-300"
								>I accept the <a
									class="font-medium text-primary-600 hover:underline dark:text-primary-500"
									href="#">Terms and Conditions</a
								></label
							>
						</div>
					</div>
					<button
						type="submit"
						class="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>Create account</button
					>
					<p class="text-sm font-light text-gray-500 dark:text-gray-400">
						Already have an account? <a
							href="#"
							on:click={() => {
								renderSignup = false;
							}}
							class="font-medium text-primary-600 hover:underline dark:text-primary-500"
							>Login here</a
						>
					</p>
				</form>
			</div>
		</div>
	</div>
</section>
