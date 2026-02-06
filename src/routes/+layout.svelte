<script>
import { dev } from '$app/environment';
import './style.css';
import favicon from '$lib/assets/favicon.svg';

let { children } = $props();

export const load = ({ locals }) => {
	return {
		user: locals.user 
	};
};
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

{#if dev}
	<div class="toast toast-end">
		<div class="alert alert-warning">
			<span>Dev Mode</span>
		</div>
	</div>
{/if}

