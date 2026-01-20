<script>
	import auth from "$lib/auth.svelte.js";
	import { dev } from "$app/environment";
	if (dev) {
		// @ts-ignore
		window.auth = auth;
	}

	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/SiteNav.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Nav />
<div class="bg-base-200">
	{@render children()}
</div>
