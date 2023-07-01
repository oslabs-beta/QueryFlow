<script lang="ts">
	import Navbar from './lib/Navbar.svelte';
	import { Route, Router } from 'svelte-routing';
	import About from './Pages/About.svelte';
	import Contact from './Pages/Contact.svelte';
	import Home from './Pages/Home.svelte';
	import Landing from './Pages/Landing.svelte';
	import Tips from './Pages/Tips.svelte';
</script>

<main>
	<Navbar />
	<Router>
		<Route path="/" component={Landing} />
		<Route path="/about" component={About} />
		<Route path="/contact" component={Contact} />
		<Route path="/tips" component={Tips} />
		<Route path="/homepage" component={Home} />
	</Router>
</main>

<style>
</style>
