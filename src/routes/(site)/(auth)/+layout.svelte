<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { currentUser } from '$lib/user';
    import { pb } from '$lib/pb';

    let { children } = $props();
    let loading = $state(true);

    onMount(() => {
        if (!pb.authStore.isValid) {
            goto('/auth?action=login&error=unauthorized');
        } else {
            loading = false;
        }
    });
</script>

{#if !loading}
    {@render children()}
{:else}
    <div class="flex h-screen items-center justify-center">
        <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>
{/if}
