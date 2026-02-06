<script>
let { state } = $props();

const tools = [
	{ id: 'text', label: 'Short Text', icon: 'M11 5h2M12 5v14m-7-3h14' },
	{ id: 'number', label: 'Number', icon: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14' },
	{ id: 'longtext', label: 'Text Area', icon: 'M4 6h16M4 12h16M4 18h7' }
];
</script>

<div class="fixed top-0 left-0 right-0 grid z-2 grid-cols-3 items-center h-14 bg-base-100">

	<div class="flex items-center justify-start px-5 gap-4">
	</div>

	<div class="flex items-center justify-center gap-3">
		<h1 class="font-bold text-md truncate">
			{state.sheet?.name || 'Untitled'}
		</h1>
	</div>

	<div class="flex items-center justify-end px-5 gap-4">
		<button 
			type="button"
			onclick={() => {
				state.isEditMode = !state.isEditMode;
				state.pendingType = null;
				state.selectedItemId = null;
			}}
			class="btn btn-sm btn-square rounded-xl transition-all {state.isEditMode ? 'btn-error' : 'btn-primary'}"
		>
			{#if state.isEditMode}
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
				</svg>
			{/if}
		</button>
	</div>
</div>
