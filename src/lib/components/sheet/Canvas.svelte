<script>
    let { state } = $props();
</script>

{#if state.sheet}
    <div class="flex flex-col items-center gap-16 max-w-5xl mx-auto">
        {#each state.sheet.pages as p, i (p.id || i)}
            <section 
                id="page-container-{i}"
                class="relative shadow-2xl rounded-sm border border-base-content/5 bg-white overflow-hidden select-none group/page transition-all duration-500"
                onmousedown={() => state.currentPageIndex = i}
            >
                <img 
                    src={p.backgroundImage} 
                    alt="Background" 
                    class="w-[800px] block pointer-events-none select-none" 
                />

                <div class="absolute inset-0">
                    {#each p.items as el (el.id)}
                        <div 
                            role="presentation"
                            class="absolute flex items-center justify-center transition-all duration-75
                                {state.isEditMode ? 'cursor-grab active:cursor-grabbing border border-dashed border-primary/40 hover:bg-primary/5' : ''}
                                {state.selectedItemId === el.id ? 'ring-2 ring-primary bg-primary/10 shadow-xl z-40' : ''}"
                            style:left="{el.x * 100}%"
                            style:top="{el.y * 100}%"
                            style:width="{el.w}px"
                            style:height="{el.h}px"
                            style:z-index={el.zIndex || 10}
                            onmousedown={(e) => state.startDrag(e, el)}
                        >
                            {#if state.isEditMode}
                                <div class="text-center truncate w-full px-2 pointer-events-none select-none" 
                                     style:font-size="{el.fontSize || 14}px" 
                                     style:color={el.color || '#000'}>
                                    {state.sheet.data[el.name] || el.label || el.name}
                                </div>
                            {:else}
                                <input 
                                    type="text"
                                    class="bg-transparent border-none text-center focus:outline-none focus:ring-1 focus:ring-primary/30 w-full h-full rounded transition-all"
                                    style:font-size="{el.fontSize || 14}px"
                                    style:color={el.color || '#000'}
                                    bind:value={state.sheet.data[el.name]}
                                />
                            {/if}
                        </div>
                    {/each}
                </div>

                <div class="absolute bottom-4 right-4 bg-black/5 backdrop-blur px-3 py-1 rounded-full opacity-0 group-hover/page:opacity-100 transition-opacity">
                    <span class="text-[10px] font-bold text-black/30 uppercase tracking-widest">Page {i + 1}</span>
                </div>
            </section>
        {/each}
    </div>
{/if}

<style>
    img { -webkit-user-drag: none; }
</style>
