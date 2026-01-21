<script>
import auth from '$lib/user.svelte.js';
</script>

<div class="navbar bg-base-100 shadow-sm">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href="/">Holy Sheet</a>
	</div>

	<div class="flex gap-2">

		{#if auth.loading}
		<div class="skeleton h-32 w-32 rounded-full"></div>
		{:else if auth.isLoggedIn}
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img
							alt="Tailwind CSS Navbar component"
							src="{auth.avatarUrl}" />
					</div>
				</div>
				<ul
					tabindex="-1"
					class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
					<li>
						<a class="justify-between">
							Profile
							<span class="badge">New</span>
						</a>
					</li>
					<li><a>Settings</a></li>
					<li onclick={auth.logout}><a>Logout</a></li>
				</ul>
			</div>

		{:else}
		<a class="btn btn-soft btn-primary" href="/login">Log In</a>
		{/if}
	</div>
</div>
