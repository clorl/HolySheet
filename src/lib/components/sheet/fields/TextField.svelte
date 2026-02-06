<script>
    let { state, config, value = $bindable() } = $props();
</script>

<div class="w-full h-full flex">
<input
		type="text"
		bind:value={value}
		class="text-neutral-900 w-full h-full text-[${config.fontSize}px]
						focus:bg-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/40
						hover:bg-primary/30 transition-colors"
/>
</div>
