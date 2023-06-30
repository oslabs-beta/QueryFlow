<script lang="ts">
  
  export let renderSignup;


</script>

<!-- framework for login -->
<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
  <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
              <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required>
              </div>
              <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              </div>
              
              <button type="submit" class="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
              
          </form>
          <button on:click={() => {renderSignup = true}} class="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
              </p>
      </div>
  </div>
</div>

<style>
.input {
    background-color: lightgray;
  }
</style>
<!-- 
<div class="loginSection">
  <label for="email">Email</label>
  <input id="email" type="text" placeholder="Type here" class="input w-full max-h-xs" />

  <label for="password">Password</label>
  <input id="password" type="password" placeholder="Type here" class="input w-full max-h-xs" />
  
  <a href="#" class="text-xs text-gray-600 hover:underline hover:text-blue-600">Forgot Password?</a>
  
  <div class="loginBtnDiv">
    <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg loginBtn">
    Login
    </button>
  </div>
</div>

<style>
  .loginSection {
    display: flex;
    flex-direction: column;
    background-color: aliceblue;
    max-width: 20rem;
  }

  .input {
    background-color: lightgray;
  }

  .loginBtnDiv {
    display: flex;
    justify-content: center;
  }

</style> -->