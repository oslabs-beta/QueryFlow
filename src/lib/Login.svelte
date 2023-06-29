<script>

</script>

<!-- framework for login -->
<div class="relative flex flex-col justify-center overflow-hidden">
  <div class="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
      <h1 class="text-3xl font-semibold text-center text-gray-700">Login</h1>
      <form class="space-y-4">
          <div>
            <label for="email" class="label">
              <span class="text-base label-text">Email</span>
              </label>
              <input type="text" placeholder="Email Address" class="w-full input input-bordered" />
          </div>
          <div>
              <label for="password" class="label">
                  <span class="text-base label-text">Password</span>
              </label>
              <input type="password" placeholder="Enter Password"
                  class="w-full input input-bordered" />
          </div>
          <div>
              <button class="btn btn-block">Login</button>
          </div>
      </form>
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