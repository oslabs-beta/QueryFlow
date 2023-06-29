<script lang="ts">
  
  // initializing vars for database
  let first_name: string;
  let last_name: string;
  let organization: string;
  let prefDatabase: string;
  let email: string;
  let password: string;

  // is this necessary? no
  let confirmPassword: string;

  // ToC checker
  let checkTerms: boolean = false;

  const postData = async () => {
    if (!checkTerms) return alert("Please agree to terms and conditions")
    if (password !== confirmPassword) return alert("Please make sure your passwords match")
    
    try {
      const response = await fetch("/api/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({first_name, last_name, organization, prefDatabase, email, password})
    })
      if (response.ok) {
        alert("account created");
        // const data = await (response.json());
      }
      else {
        // need error here
      }
    } catch (error) {
      
    }
 }





</script>

<section>
  <div class="toast toast-top toast-center">
    <div class="alert alert-success">
      <span>Message sent successfully.</span>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign up
        </h1>
        <form class="space-y-4 md:space-y-6" action="#">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="grid-first-name">
                First Name
                <span class="asterisk">*</span>
              </label>
              <input class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="grid-first-name" type="text" placeholder="Jane" required>
              <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="grid-last-name">
                Last Name
                <span class="asterisk">*</span>
              </label>
              <input class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="grid-last-name" type="text" placeholder="Doe" required>
            </div>
          </div>
          <div>
            <label for="organization" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organization</label>
            <input type="email" name="organization" id="organization" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Organization (optional)" >
        </div>
        <div class="inline-block relative w-64">
            <label for="database" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preferred Database (optional)</label>
            <select name="database" id="database" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>Choose a database</option>
              <option>PSQL</option>
              <option>MySQL</option>
              <option>Redis</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email
                <span class="asterisk">*</span>
              </label>
              <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required>
          </div>
          <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password
                <span class="asterisk">*</span>
              </label>
              <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div>
              <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password
                <span class="asterisk">*</span>
              </label>
              <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required>
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
              </div>
          </div>
          <button type="submit" class="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create account</button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
