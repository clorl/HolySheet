<script>
    import { pb } from '$lib/pb';
    let email = $state('');
    let password = $state('');
    let user = $state(pb.authStore.model);

    // Sync state when auth changes
    pb.authStore.onChange(() => {
        user = pb.authStore.model;
    });

    async function login() {
        await pb.collection('users').authWithPassword(email, password);
    }

    function logout() {
        pb.authStore.clear();
    }
</script>

{#if user}
    <div class="flex items-center gap-4">
        <span>Logged in as: {user.email}</span>
        <button class="btn btn-error btn-sm" onclick={logout}>Logout</button>
    </div>
{:else}
    <div class="flex gap-2">
        <input class="input input-bordered input-sm" type="email" bind:value={email} placeholder="Email" />
        <input class="input input-bordered input-sm" type="password" bind:value={password} placeholder="Password" />
        <button class="btn btn-primary btn-sm" onclick={login}>Login</button>
    </div>
{/if}
