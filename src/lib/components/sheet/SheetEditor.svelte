<script>
    import { SheetState } from './state.svelte.js';
    import Toolbar from './Toolbar.svelte';
    import Canvas from './Canvas.svelte';
    import PropertyEditor from './PropertyEditor.svelte';

    let { initialData } = $props();

    // Initialize the shared state
    const state = new SheetState(initialData);
</script>

<div class="relative w-full h-full bg-base-300 font-sans text-base-content overflow-hidden flex flex-col">
    <!-- Component-based UI -->
    <Toolbar {state} />

    <main class="flex-1 overflow-y-auto pt-24 pb-12 px-4 scroll-smooth">
        <Canvas {state} />
    </main>

    <PropertyEditor {state} />

    <!-- Mini Status Footer -->
    <footer class="bg-base-100/50 backdrop-blur border-t border-white/5 px-4 py-1.5 text-[9px] uppercase tracking-widest opacity-40 flex justify-between items-center">
        <span>{state.sheet?.name || 'Untitled Sheet'}</span>
        <div class="flex gap-4">
            <span>{state.isEditMode ? 'Design Mode' : 'Play Mode'}</span>
            <span>Page {state.currentPageIndex + 1}</span>
        </div>
    </footer>
</div>
