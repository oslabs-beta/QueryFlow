<script>

</script>

<div class="relative flex flex-col justify-center h-screen overflow-hidden">
  <div class="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
      <h1 class="text-3xl font-semibold text-center text-gray-700">Sign Up</h1>
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
              <button class="btn btn-block">Sign Up</button>
          </div>
      </form>
  </div>
</div>

<style>
.input {
    background-color: lightgray;
  }
</style>
