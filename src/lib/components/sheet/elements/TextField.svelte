<script>
    /** * @typedef {Object} Props
     * @property {import('$lib/sheet').Element} config - The position/size
     * @property {string} value - The actual text (bound from the parent)
     */
    let { config, value = $bindable() } = $props();

    // Calculate position. We use % to ensure responsiveness.
    let style = $derived(`
        left: ${config.x}%; 
        top: ${config.y}%; 
        width: ${config.w}%; 
        height: ${config.h}%;
        z-index: ${config.zIndex || 1};
    `);
</script>

<div class="absolute group" {style}>
    <input
        type="text"
        bind:value={value}
        placeholder=" "
        class="w-full h-full bg-transparent border-none px-1 text-[1.2vw] 
               focus:bg-primary/5 focus:outline-none focus:ring-1 focus:ring-primary/30
               hover:bg-primary/5 transition-colors"
    />
    
    <div class="absolute inset-0 border border-dashed border-primary/20 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
</div>
