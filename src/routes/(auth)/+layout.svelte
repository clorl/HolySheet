<script>
import { user } from '$lib/pocketbase';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';

onMount(() => {
	if ($user) {
		goto('/');
	}
});
</script>

{#if $user}
	<slot /> {:else}
	<p>Redirecting...</p>
{/if}
