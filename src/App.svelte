<script>
	import LoginPage from './lib/Login.svelte'
	import Navbar from './lib/Navbar.svelte'
	import Signup from './lib/Signup.svelte'
  import graph from './assets/graph.jpg'
</script>

<div class="container mx-auto">
  <Navbar/>
  <div class="grid grid-cols-2 gap-2">
		<div class="h-3/6">
      <img src={graph} alt="">
    </div>
    <LoginPage />
		<Signup />

  </div>
</div>



<style>
  
</style>