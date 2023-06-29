<script>
	import Login from "../lib/Login.svelte";
	import Signup from "../lib/Signup.svelte";
  import graph from '../assets/graph.jpg'

  
</script>


<div class="grid sm:grid-cols-1 md:grid-cols-2 ">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <img src={graph} alt="graph" >
  </div>
  <Login />
  <!-- <Signup/> -->
</div>