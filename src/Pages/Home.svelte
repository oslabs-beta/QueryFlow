<script lang="ts">
	import Drawer from '../lib/Drawer.svelte';
	import { get } from 'svelte/store';
	import { userInfoStore } from '../store';
	let userInfo = get(userInfoStore);
	console.log('user info in home', userInfo);

	// send a query to backend
</script>

<div class="flex flex-col items-center justify-center">
	<!-- ===== FIX USERINFO._ID BELOW ===== -->
	<Drawer userId={userInfo._id} />
	<div />
</div>

<style>
</style>
