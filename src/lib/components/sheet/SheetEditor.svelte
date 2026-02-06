<script>
import { SheetState } from './state.svelte.js'; 
import Toolbar from './Toolbar.svelte';
import Canvas from './Canvas.svelte';
import PropertyEditor from './PropertyEditor.svelte';
import Sidebar from '$lib/components/Sidebar.svelte';

let { data } = $props();

/* @type SheetState */
const sheetState = new SheetState(data);
</script>

<div class="relative w-full h-screen bg-base-300 font-sans text-base-content overflow-hidden flex flex-col">
	<Toolbar state={sheetState} />

	<div class="flex flex-1 overflow-hidden mt-14">

		<main class="flex-1 relative overflow-auto">
			<Canvas state={sheetState} />
		</main>

		<Sidebar bind:isOpen={sheetState.isEditMode} direction="right">
			<div class="flex-1 overflow-y-auto flex flex-col relative">
				<div class="p-2 flex items-center justify-between sticky top-0 bg-base-900 z-10 border-b border-white/5">
					<h3 class="text-[10px] font-black uppercase tracking-tighter text-slate-500">Elements</h3>
					<button
						class="btn btn-ghost p-1 rounded-md "
						onclick={e => {
							e.preventDefault();
						}}
					>
						<svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
					</button>
				</div>
			</div>
		</Sidebar>

	</div>
</div>
