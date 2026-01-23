<script>
import { dev } from '$app/environment';
import './app.css';
import favicon from '$lib/assets/favicon.svg';
import Nav from '$lib/components/SiteNav.svelte';

let { children } = $props();

export const load = ({ locals }) => {
	return {
		user: locals.user 
	};
};
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

