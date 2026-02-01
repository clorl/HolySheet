<script>
    let { config, value = $bindable() } = $props();


    // Calculate position. We use % to ensure responsiveness.
    let style = $derived(`
        left: ${config.x}%; 
        top: ${config.y}%; 
        width: ${config.w}%; 
        height: 1.5em;
        z-index: ${config.zIndex || 1};
    `);
</script>

<div class="absolute group bg-primary/30 text-[${config.fontSize}]" {style}>
    <input
        type="text"
        bind:value={value}
        placeholder=" "
        class="w-full h-full bg-transparent border-none px-1 text-[${config.fontSize}]
               focus:bg-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/40
               hover:bg-primary/30 transition-colors"
    />
    
    <div class="absolute inset-0 border border-dashed border-primary/20 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
</div>
