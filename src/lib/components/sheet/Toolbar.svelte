<script>
    let { state } = $props();
</script>

<div class="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 w-fit">
    <!-- Identity & Toggle -->
    <div class="flex items-center gap-4 bg-base-100/80 backdrop-blur-xl shadow-2xl border border-white/10 px-4 py-2 rounded-2xl h-14">
        <div class="flex items-center gap-3 border-r border-white/10 pr-4">
             <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                </svg>
             </div>
             <div class="hidden sm:flex flex-col">
                <span class="text-[9px] font-black uppercase tracking-widest opacity-40 leading-none mb-1">Sheet</span>
                <h1 class="font-bold text-xs tracking-tight truncate max-w-[120px]">{state.sheet?.name || '...'}</h1>
             </div>
        </div>

        <button 
            type="button"
            onclick={() => state.isEditMode = !state.isEditMode}
            class="group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 {state.isEditMode ? 'bg-error/20 text-error' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}"
            title={state.isEditMode ? 'Exit Designer' : 'Edit Layout'}
        >
            {#if state.isEditMode}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            {/if}
        </button>
    </div>

    <!-- Tool Additions -->
    {#if state.isEditMode}
        <div class="flex items-center gap-2 bg-base-100/80 backdrop-blur-xl shadow-2xl border border-white/10 px-3 py-2 rounded-2xl h-14">
            <button class="btn btn-ghost btn-sm btn-square rounded-xl hover:bg-primary hover:text-white" onclick={() => state.addItem('text')}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
            </button>
            <div class="w-px h-6 bg-white/10 mx-1"></div>
            <button class="btn btn-ghost btn-sm btn-square rounded-xl opacity-30 cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </button>
        </div>
    {/if}
</div>
