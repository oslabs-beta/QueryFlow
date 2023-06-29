<script lang="ts">
	
  import '@skeletonlabs/skeleton/styles/skeleton.css';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// control rendering login OR signup within slot
	let renderLoginPage: boolean = true;
  
</script>

<AppShell>
  
	<svelte:fragment slot="header">
    <AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">QueryFlow</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.gg/EXqV7W8MtY"
					target="_blank"
					rel="noreferrer"
				>
					Discord
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>


  </svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<!-- <slot /> -->
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
	<!-- (footer) -->
</AppShell>

<!-- <style>
  * {
		display: flex;
	}
</style> -->