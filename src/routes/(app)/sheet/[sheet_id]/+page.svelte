<script>
	import SheetEditor from "$lib/components/sheet/SheetEditor.svelte";
	import { Sheet, Page, CanvasItem } from "$lib/sheet.js";
	let sheet = $state(null);

  // Simulated Fetch
  const loadSheet = async () => {
    sheet = Sheet.new({
        name: "Torbek the Mighty",
        data: { str: "18", dex: "12", con: "16" },
        pages: [
            Page.new({
                backgroundImage: "/sheet-1.jpg",
                items: [
                    CanvasItem.new({ name: "str", label: "Strength", x: 0.45, y: 0.15, w: 100, h: 40 })
                ]
            }),
            Page.new({ backgroundImage: "/sheet-2.jpg" }),
            Page.new({ backgroundImage: "/sheet-3.jpg" })
        ]
    });
  };

  loadSheet();
</script>

<div class="relative min-h-screen bg-base-300 font-sans text-base-content overflow-hidden flex flex-col">
	{#if sheet}
		<SheetEditor data={sheet} />
	{:else}
		<div class="skeleton h-[1vh] w-[0.75vw]"></div>
	{/if}
</div>
