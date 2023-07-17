<script lang="ts">
	import Navbar from './lib/Navbar.svelte';
	import { Route, Router } from 'svelte-routing';
	import About from './Pages/About.svelte';
	import Home from './Pages/Home.svelte';
	import UserLogin from './Pages/UserLogin.svelte';
	import Landing from './Pages/Landing.svelte';
	import Tips from './Pages/Tips.svelte';
	import AllMetrics from './Pages/AllMetrics.svelte';
</script>

<!-- holding all our routes for their respective pages -->
<main>
	<Navbar />
	<div class="pt-16">
		<Router>
			<Route path="/" component={Landing} />
			<Route path="/login" component={UserLogin} />
			<Route path="/about" component={About} />
			<Route path="/tips" component={Tips} />
			<Route path="/home" component={Home} />
			<Route path="/all-metrics" component={AllMetrics} />
		</Router>
	</div>
</main>

<style>
</style>
