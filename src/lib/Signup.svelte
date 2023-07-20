<script lang="ts">
  import { Modal,Button } from 'flowbite-svelte'
  import Terms from './Terms.svelte';
  //boolean for the modal
  let clickOutsideModal:boolean = false;
	// initializing vars for database
	let firstName: string;
	let lastName: string;
	let organization: string;
	let database: string;
	let email: string;
	let password: string;

  //used for terms and conditions checkbox
  let isChecked:boolean = false;

  function acceptTerms() {
     isChecked = true;
   }

  // used for rendering signup component vs. login component
	export let renderSignup: boolean;

  // used for comparing passwords when creating acc
	let confirmPassword: string;

  // signing up - POST request
	const postData = async (e: any) => {
		e.preventDefault();
    if (password !== confirmPassword) return alert('Please make sure your passwords match');

    // body var for post request
		// needs adjustment, database/organization both optional, doesn't account for all conditions
		const body = database
			? { firstName, lastName, organization, database, email, password }
			: { firstName, lastName, organization, email, password };

		try {
			const response = await fetch('/api/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});
			if (response.ok) {      
				alert('account created');

        // switches to login component
				renderSignup = false;

			} else {
				console.error('Error signing up');
			}
		} catch (error) {
      console.error(error);
    }
	};
</script>

<!-- signup component -->
<section class="z-10">
	<div class="flex-col px-6 mx-auto lg:py-0">
		<div
			class="w-full bg-white rounded-lg shadow shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
					<h1 class="ml-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
						Sign Up
					</h1>
				</div>
				<!-- form that holds/binds all info in it to submit with below on:submit -->
				<form class="space-y-4 md:space-y-6" on:submit={postData}>
          <div class="flex flex-wrap -mx-3">
            <div class="w-1/2 px-3">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="grid-first-name">
                    First Name
                    <span class="asterisk">*</span>
                </label>
                <input
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="grid-first-name"
                    type="text"
                    placeholder="Jane"
                    required
                    bind:value={firstName}
                />
            </div>
            <div class="w-1/2 px-3">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white xs:text-xs" for="grid-last-name">
                    Last Name
                    <span class="asterisk">*</span>
                </label>
                <input
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="Doe"
                    required
                    bind:value={lastName}
                />
            </div>
        </div>
        <div class="flex flex-wrap -mx-3">
            <div class="w-1/2 px-3">
                <label
                    for="organization"
                    class="block shrink-text mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Organization
                </label>
                <input
                    type="text"
                    name="organization"
                    id="organization"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="e.g. TSM"
                    bind:value={organization}
                />
            </div>
            <div class="w-1/2 px-3">
                <label
                    for="database"
                    class="block shrink-text mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Preferred Database
                </label>
                <select
                    bind:value={database}
                    name="database"
                    id="database"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>Please choose...</option>
                    <option>PSQL</option>
                    <option>MySQL</option>
                    <option>Redis</option>
                </select>
            </div>
        </div>
          
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Your email
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
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Password
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
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Confirm password
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
              bind:checked={isChecked}
								id="terms"
								aria-describedby="terms"
								type="checkbox"
								class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
								required
							/>
						</div>
						<div class="ml-3 text-sm">
							<label for="terms" class="font-light text-gray-500 dark:text-gray-300">
								I accept the <a
                on:click={() => clickOutsideModal = true}
									class="font-medium text-primary-600 hover:underline dark:text-primary-500"
									href={'#'}>
									Terms and Conditions
								</a>
                <Modal class="mt-12 prose-lg prose" size="lg" title="QueryFlow Terms and Conditions" bind:open={clickOutsideModal} autoclose outsideclose>
                  <Terms />
                  <svelte:fragment slot='footer'>
                    <Button on:click={acceptTerms} color="green">I Accept</Button>
                    <Button color="red">Decline</Button>
                  </svelte:fragment>
                </Modal>
								</label>
						</div>
					</div>
					<button
						type="submit"
						class="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>Create account</button
					>
					<p class="text-sm font-light text-gray-500 dark:text-gray-400">
						Already have an account? 
            <a href={'#'}
							on:click={() => {
								renderSignup = false;
							}}
							class="font-medium text-primary-600 hover:underline dark:text-primary-500">
							Login
						</a>
					</p>
				</form>
			</div>
		</div>
	</div>
</section>


<style>
  .asterisk{
    color:red;
  }
   /* mostly for preferred database  */
  @media (max-width: 378px) {
    .shrink-text {
        font-size: 0.75rem; /* Adjust this value as desired */
    }
}
</style>