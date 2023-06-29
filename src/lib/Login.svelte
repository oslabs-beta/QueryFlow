<script>

</script>

<!-- framework for login -->
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

</style>