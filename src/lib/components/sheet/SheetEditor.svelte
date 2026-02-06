<script>
import { SheetState } from './state.svelte.js'; 
import Toolbar from './Toolbar.svelte';
import Canvas from './Canvas.svelte';
import PropertyEditor from './PropertyEditor.svelte';
import Sidebar from '$lib/components/Sidebar.svelte';

let { data } = $props();

/* @type SheetState */
const sheetState = new SheetState(data);

// UI State for the field type dropdown
let showAddMenu = $state(false);

/**
 * Array of available field types. 
 * Note: Defined as a plain array to ensure compatibility within the Svelte script block.
 */
const fieldTypes = [
	{ id: 'text', label: 'Text Field' },
	{ id: 'longtext', label: 'Long Text' },
	{ id: 'checkbox', label: 'Checkbox' },
	{ id: 'image', label: 'Image' }
];

function selectFieldType(type) {
	sheetState.pendingType = type;
	showAddMenu = false;
}
</script>

<div class="relative w-full h-screen bg-base-300 font-sans text-base-content overflow-hidden flex flex-col">
	<Toolbar state={sheetState} />

	<div class="flex flex-1 overflow-hidden mt-14">

		<main class="flex-1 relative overflow-auto">
			<Canvas state={sheetState} />
		</main>

		<Sidebar bind:isOpen={sheetState.isEditMode} direction="right">
			<div class="flex-1 flex flex-col h-full">
				<div class="p-2 flex items-center justify-between bg-base-900 border-b border-white/5 relative">
					<h3 class="text-[10px] font-black uppercase tracking-tighter text-slate-500">Elements</h3>
					
					<div class="relative">
						<button
							class="btn btn-ghost btn-sm p-1 rounded-md {showAddMenu ? 'bg-primary text-primary-content' : ''}"
							onclick={e => {
								e.stopPropagation();
								showAddMenu = !showAddMenu;
							}}
						>
							<svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/>
							</svg>
						</button>

						{#if showAddMenu}
							<!-- Fixed positioning with high z-index to break out of sidebar clipping -->
							<div class="fixed right-4 mt-2 w-48 bg-base-100 border border-white/10 shadow-2xl rounded-lg overflow-hidden z-[9999] top-24">
								<div class="bg-base-200 px-3 py-2 border-b border-white/5">
									<span class="text-[9px] font-bold uppercase opacity-50 tracking-widest">Add Element</span>
								</div>
								<div class="py-1">
									{#each fieldTypes as type}
										<button
											class="w-full text-left px-4 py-2 text-xs font-bold hover:bg-primary hover:text-primary-content transition-colors flex items-center justify-between"
											onclick={() => selectFieldType(type.id)}
										>
											{type.label}
											{#if sheetState.pendingType === type.id}
												<div class="size-2 bg-primary rounded-full"></div>
											{/if}
										</button>
									{/each}
								</div>
							</div>
							
							<!-- Click away listener overlay to handle closing the menu -->
							<div 
								role="presentation"
								class="fixed inset-0 z-[9998]" 
								onclick={() => showAddMenu = false}
							></div>
						{/if}
					</div>
				</div>

				<div class="flex-1 overflow-y-auto p-2">
					{#if sheetState.pendingType}
						<div class="p-4 bg-primary/10 border border-primary/20 rounded-lg mb-4 animate-in fade-in slide-in-from-top-2">
							<div class="flex items-center justify-between mb-2">
								<p class="text-[10px] font-black uppercase text-primary tracking-widest leading-tight">
									Placement Mode
								</p>
								<button 
									class="text-[9px] font-bold underline opacity-50 hover:opacity-100"
									onclick={() => sheetState.pendingType = null}
								>
									Cancel
								</button>
							</div>
							<p class="text-xs font-medium">Click and drag on the canvas to place your {sheetState.pendingType} field.</p>
						</div>
					{/if}
					
					<div class="text-center py-12 px-4 opacity-30 border-2 border-dashed border-white/10 rounded-xl">
						<p class="text-xs italic">Select an element on the canvas or use the (+) icon to create new fields.</p>
					</div>
				</div>
			</div>
		</Sidebar>

	</div>
</div>
