<script>
    import { fly } from 'svelte/transition';
    import { currentUser } from '$lib/user.js';

    const steps = [
        { title: "Upload", desc: "Upload your PDF." },
        { title: "Edit", desc: "Add fields." },
        { title: "Play", desc: "Fill it in. Sync live." }
    ];
</script>

<div class="min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 text-center">
    
    <div in:fly={{ y: 20, duration: 600 }}>
        <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-4">
            Holy<span class="text-primary">Sheet.</span>
        </h1>
        <p class="text-lg md:text-xl opacity-60 max-w-lg mx-auto leading-relaxed">
            The no-bullshit character sheet editor.
						Use the book's PDF, get playing quickly.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 w-full max-w-3xl mt-16 mb-20">
        {#each steps as step, i}
            <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-full bg-base-100 border border-white/10 flex items-center justify-center font-mono text-sm mb-4 shadow-xl">
                    {i + 1}
                </div>
                <h3 class="font-bold text-sm uppercase tracking-widest mb-1">{step.title}</h3>
                <p class="text-xs opacity-40 px-4">{step.desc}</p>
            </div>
        {/each}
    </div>

    <div class="flex flex-col items-center gap-4">
        {#if currentUser}
            <a href="/my" class="btn btn-primary btn-outline btn-lg rounded-2xl px-12 h-16 shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
                Go to my Sheets
            </a>
        {:else}
            <a href="/auth?action=signup" class="btn btn-primary btn-lg rounded-2xl px-12 h-16 shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
                Get Started
            </a>
            <p class="text-[10px] opacity-30 uppercase tracking-[0.2em]">
                Completely free & open source
            </p>
        {/if}
    </div>

    <div class="mt-24 w-full max-w-4xl opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
        <div class="border border-white/5 bg-base-100/50 rounded-t-2xl p-2 flex gap-1.5 items-center px-4">
            <div class="w-2 h-2 rounded-full bg-white/10"></div>
            <div class="w-2 h-2 rounded-full bg-white/10"></div>
            <div class="w-2 h-2 rounded-full bg-white/10"></div>
        </div>
        <div class="aspect-[16/10] bg-base-100/30 rounded-b-2xl border-x border-b border-white/5 flex items-center justify-center border-t-0">
            <div class="flex flex-col items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 opacity-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span class="text-[10px] uppercase tracking-widest opacity-10 font-bold">PDF Canvas Interface</span>
            </div>
        </div>
    </div>
</div>
