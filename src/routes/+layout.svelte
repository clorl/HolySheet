<script>
	import { dev } from '$app/environment';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/SiteNav.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Nav />
{@render children()}

{#if dev}

<div class="toast toast-end">
  <div class="alert alert-warning">
    <span>You are in dev mode</span>
  </div>
</div>
	
{/if}

