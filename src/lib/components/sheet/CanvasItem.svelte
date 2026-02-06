<script>
    import TextField from './fields/TextField.svelte';
    let { state, config } = $props();

    // Defined outside of $derived to ensure cleaner parsing
    const components = {
        text: TextField,
        number: TextField,
        longtext: TextField
    };

    let SelectedComponent = $derived(components[config.type] || TextField);

    // Style string for absolute positioning and sizing
    let style = $derived(`
        left: ${config.x * 100}%; 
        top: ${config.y * 100}%; 
        width: ${config.w}px; 
        height: ${config.h}px;
        z-index: ${config.zIndex || 1};
    `);
</script>

<div 
    class="absolute group border transition-colors flex
    {state.isEditMode ? 'cursor-grab active:cursor-grabbing border-primary/50 hover:border-primary/70' : 'border-primary/30'}
    {state.selectedItemId === config.id ? 'ring-2 ring-primary border-primary z-50' : ''}"
    {style}
    onmousedown={(e) => {
        e.stopPropagation();
       // state.startDrag(e, config);
    }}
>
    <!-- Dynamic field component -->
    <SelectedComponent {state} {config} bind:value={state.sheet.data[config.name]} />
    
    {#if state.isEditMode && state.selectedItemId === config.id}
        <div class="absolute -top-5 left-0 bg-primary text-[8px] text-white px-1 uppercase font-bold rounded-t-sm shadow-sm pointer-events-none">
            {config.type}
        </div>
    {/if}
</div>
