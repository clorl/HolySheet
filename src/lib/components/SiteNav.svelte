<script>
import { page } from '$app/state';
import { dev } from "$app/environment";
import { currentUser, getAvatar } from "$lib/user"

const NAV_ENTRIES = {};
</script>

<div class="navbar bg-base-100 shadow-sm">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href="/">Holy Sheet</a>
	</div>

	<div class="flex gap-2">
		{#if $currentUser}
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
						<img src={getAvatar($currentUser)} alt="avatar" />
				</div>
			</div>

			<div class="dropdown-content z-[1] mt-3 min-w-72 rounded-box bg-base-100 p-0 shadow-2xl ring-1 ring-base-content/5">

				<div class="flex flex-col items-center border-b border-base-200 px-6 py-6 text-center">
					<div class="avatar mb-3">
						<div class="w-16 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
							<img src={getAvatar($currentUser)} alt="avatar" />
						</div>
					</div>
					<div class="w-full truncate">
						<p class="text-lg font-bold leading-none">{$currentUser.name || 'Anonymous'}</p>
						<p class="mt-1 text-sm opacity-60 truncate">{$currentUser.email}</p>
					</div>
				</div>

				<ul class="menu menu-md w-full p-2">
					<li>
						<a href="/profile" class="flex items-center justify-between py-3">
							<div class="flex items-center gap-3">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
								Profile
							</div>
							<!-- <span class="badge badge-primary badge-sm">New</span> -->
						</a>
					</li>
					<li>
						<a href="/settings" class="flex items-center gap-3 py-3">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
							Settings
						</a>
					</li>

					<div class="divider my-1"></div>

					<li>
						<form method="POST" action="/auth?/logout" class="w-full p-0">
							<button type="submit" class="flex w-full items-center gap-3 py-3 text-error hover:bg-error/10">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
								Log Out
							</button>
						</form>
					</li>
				</ul>
			</div>


		</div>

		{:else}
		<a class="btn btn-primary" href="/auth?action=signup">Create an account</a>
		<a class="btn btn-primary btn-ghost" href="/auth">Log In</a>
		{/if}

	</div>
</div>
