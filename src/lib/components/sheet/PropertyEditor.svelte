<script>
    let { state } = $props();
    let item = $derived(state.selectedItem);
</script>

<aside 
    class="fixed right-4 top-24 h-[calc(100vh-8rem)] w-80 bg-base-100/95 backdrop-blur-xl shadow-2xl border border-white/10 z-[60] rounded-3xl transition-all duration-500 ease-out flex flex-col
    { (state.isEditMode && item) ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0' }">
    
    <div class="p-6 border-b border-white/5 flex justify-between items-center bg-white/5 rounded-t-3xl">
        <div>
            <h2 class="font-black text-[10px] uppercase tracking-[0.2em] text-primary">Properties</h2>
            <p class="text-[9px] opacity-40 font-mono mt-1">{item?.id.substring(0,12) || ''}</p>
        </div>
        <button type="button" class="btn btn-ghost btn-xs btn-circle bg-white/5" onclick={() => { state.selectedItemId = null; }}>✕</button>
    </div>

    {#if item}
        <div class="p-6 flex flex-col gap-6 overflow-y-auto flex-1">
            <div class="form-control">
                <label class="label"><span class="label-text font-bold text-[10px] uppercase opacity-50 tracking-wider">Binding Key</span></label>
                <input type="text" class="input input-sm bg-base-300 border-none rounded-xl font-mono text-xs focus:ring-2 focus:ring-primary/40" bind:value={item.name} />
            </div>

            <div class="divider text-[9px] opacity-20 uppercase tracking-[.3em]">Layout</div>

            <div class="grid grid-cols-2 gap-3">
                <div class="form-control">
                    <label class="label"><span class="label-text font-bold text-[10px] opacity-50">Width (px)</span></label>
                    <input type="number" class="input input-sm bg-base-300 border-none rounded-xl" bind:value={item.w} />
                </div>
                <div class="form-control">
                    <label class="label"><span class="label-text font-bold text-[10px] opacity-50">Height (px)</span></label>
                    <input type="number" class="input input-sm bg-base-300 border-none rounded-xl" bind:value={item.h} />
                </div>
            </div>

            <div class="divider text-[9px] opacity-20 uppercase tracking-[.3em]">Style</div>

            <div class="form-control">
                <label class="label"><span class="label-text font-bold text-[10px] opacity-50 uppercase">Font Size</span></label>
                <input type="number" class="input input-sm bg-base-300 border-none rounded-xl" bind:value={item.fontSize} />
            </div>

            <div class="form-control">
                <label class="label"><span class="label-text font-bold text-[10px] opacity-50 uppercase">Text Color</span></label>
                <div class="flex items-center gap-3 bg-base-300 p-2 rounded-xl">
                    <input type="color" class="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" bind:value={item.color} />
                    <span class="text-[10px] font-mono opacity-60 uppercase">{item.color}</span>
                </div>
            </div>

            <div class="pt-6 mt-auto">
                <button type="button" class="btn btn-error btn-sm btn-block rounded-xl gap-2" onclick={() => state.deleteItem()}>
                    Delete Field
                </button>
            </div>
        </div>
    {/if}
</aside>
