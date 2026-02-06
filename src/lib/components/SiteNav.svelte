<script>
    import { logout, currentUser, getAvatar } from "$lib/user";
</script>

<nav class="sticky top-0 z-[100] w-full px-6 py-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between bg-base-100/60 backdrop-blur-xl border border-white/5 rounded-2xl px-4 py-2 shadow-2xl ring-1 ring-black/5">
        
        <!-- Brand -->
        <div class="flex-1">
            <a class="flex items-center gap-2 group transition-all" href="/">
                <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-content font-black text-xl italic group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                    H
                </div>
                <span class="font-black tracking-tighter text-xl hidden sm:inline-block">
                    Holy<span class="text-primary italic">Sheet.</span>
                </span>
            </a>
        </div>

        <!-- Auth Actions -->
        <div class="flex items-center gap-2">
            {#if $currentUser}
                <div class="dropdown dropdown-end">
                    <!-- Trigger -->
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar border border-white/10 hover:bg-white/5 transition-all p-0.5">
                        <div class="w-full rounded-full overflow-hidden ring-1 ring-white/20">
                            <img src={getAvatar($currentUser)} alt="avatar" />
                        </div>
                    </div>

                    <!-- Menu -->
                    <div class="dropdown-content z-[1] mt-4 min-w-[280px] rounded-3xl bg-base-100 p-0 shadow-2xl ring-1 ring-white/10 overflow-hidden backdrop-blur-2xl">
                        <!-- User Header -->
                        <div class="flex flex-col items-center border-b border-white/5 px-6 py-8 text-center bg-gradient-to-b from-primary/5 to-transparent">
                            <div class="avatar mb-4">
                                <div class="w-20 rounded-full ring-2 ring-primary ring-offset-4 ring-offset-base-100 shadow-2xl overflow-hidden">
                                    <img src={getAvatar($currentUser)} alt="avatar" />
                                </div>
                            </div>
                            <div class="w-full truncate px-2">
                                <p class="text-lg font-black tracking-tight leading-none">
                                    {$currentUser.name || 'Anonymous'}
                                </p>
                                <p class="text-[11px] opacity-40 font-mono mt-2 truncate">
                                    {$currentUser.email}
                                </p>
                            </div>
                        </div>

                        <!-- Menu Items -->
                        <ul class="menu menu-md w-full p-3 gap-1">
                            <li>
                                <a href="/profile" class="flex items-center gap-3 py-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all group">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-40 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span class="font-bold text-sm">Profile</span>
                                </a>
                            </li>
                            <li>
                                <a href="/settings" class="flex items-center gap-3 py-3 rounded-xl hover:bg-white/5 transition-all group">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-40 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span class="font-bold text-sm">Settings</span>
                                </a>
                            </li>

                            <div class="h-px bg-white/5 my-2 mx-2"></div>

                            <li>
                                <button onclick={logout} class="flex items-center gap-3 py-3 rounded-xl hover:bg-error/10 text-error transition-all group">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-60 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span class="font-bold text-sm">Log Out</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            {:else}
                <div class="flex items-center gap-1">
                    <a class="btn btn-ghost btn-sm rounded-xl px-4 opacity-60 hover:opacity-100 transition-opacity" href="/auth">
                        Log In
                    </a>
                    <a class="btn btn-primary btn-sm rounded-xl px-5 shadow-lg shadow-primary/20 border-none" href="/auth?action=signup">
                        Join
                    </a>
                </div>
            {/if}
        </div>
    </div>
</nav>
