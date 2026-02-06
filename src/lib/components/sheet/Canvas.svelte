<script>
import CanvasItem from "$lib/components/sheet/CanvasItem.svelte"
let { state: sheetState } = $props();

// Interaction State for Click-and-Drag Creation
let isDrawing = $state(false);
let drawStart = $state({ x: 0, y: 0 });
let drawCurrent = $state({ x: 0, y: 0 });

function handleCanvasMouseDown(e, pageIndex) {
	sheetState.currentPageIndex = pageIndex;

	// Only trigger draw logic if a tool is active
	if (sheetState.isEditMode && sheetState.pendingType) {
		isDrawing = true;
		const rect = e.currentTarget.getBoundingClientRect();
		drawStart = { x: e.clientX - rect.left, y: e.clientY - rect.top };
		drawCurrent = { ...drawStart };

		const onMouseMove = (moveEvent) => {
			drawCurrent = { x: moveEvent.clientX - rect.left, y: moveEvent.clientY - rect.top };
		};

		const onMouseUp = () => {
			isDrawing = false;
			const x = Math.min(drawStart.x, drawCurrent.x) / rect.width;
			const y = Math.min(drawStart.y, drawCurrent.y) / rect.height;
			const w = Math.abs(drawStart.x - drawCurrent.x);
			const h = Math.abs(drawStart.y - drawCurrent.y);

			if (w > 10 && h > 10) {
				sheetState.createItemAt(sheetState.pendingType, { x, y, w, h });
			}

			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
		};

		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}
}
</script>

<main class="flex-1 overflow-y-auto py-12 scroll-smooth">
	{#if sheetState.sheet}
		<div class="flex flex-col items-center gap-16 max-w-5xl mx-auto">
			{#each sheetState.sheet.pages as p, i (p.id || i)}
				<section 
					id="page-container-{i}"
					class="relative shadow-2xl rounded-sm border border-base-content/5 bg-white overflow-hidden select-none transition-all
					{sheetState.pendingType ? 'cursor-crosshair' : ''}"
					onmousedown={(e) => handleCanvasMouseDown(e, i)}
				>
					<!-- Page Background -->
					<img src={p.backgroundImage} alt="Sheet Page" class="w-[800px] block pointer-events-none" />

					<!-- Drawing Preview -->
					{#if isDrawing && sheetState.currentPageIndex === i}
						<div class="absolute border-2 border-primary bg-primary/10 pointer-events-none z-[100] rounded-sm"
							style:left="{Math.min(drawStart.x, drawCurrent.x)}px"
							style:top="{Math.min(drawStart.y, drawCurrent.y)}px"
							style:width="{Math.abs(drawStart.x - drawCurrent.x)}px"
							style:height="{Math.abs(drawStart.y - drawCurrent.y)}px"
						></div>
					{/if}

					<!-- Placed Elements -->
					{#each p.items as el}
						<CanvasItem config={el} state={sheetState}></CanvasItem>
					{/each}
				</section>
			{/each}
		</div>
	{/if}
</main>

<style>
img { -webkit-user-drag: none; user-select: none; }
</style>
