<script lang="ts">
	import Navbar from './lib/Navbar.svelte';
	import { Route, Router } from 'svelte-routing';
	import About from './pages/About.svelte';
	import Home from './pages/Home.svelte';
	import UserLogin from './pages/UserLogin.svelte';
	import Landing from './pages/Landing.svelte';
	import Tips from './pages/Tips.svelte';
	import AllMetrics from './pages/AllMetrics.svelte';
	import Privacy from './pages/Privacy.svelte';
	import { ToastContainer, FlatToast } from 'svelte-toasts';
</script>

<!-- holding all our routes for their respective pages -->
<main class="min-h-screen">
	<ToastContainer placement="top-center" let:data>
		<FlatToast {data} />
		<!-- Provider template for your toasts -->
	</ToastContainer>
	<Navbar />
	<div class="pt-16">
		<Router>
			<Route path="/" component={Landing} />
			<Route path="/login" component={UserLogin} />
			<Route path="/about" component={About} />
			<Route path="/tips" component={Tips} />
			<Route path="/home" component={Home} />
			<Route path="/privacy" component={Privacy} />
			<Route path="/all-metrics" component={AllMetrics} />
		</Router>
	</div>
</main>
