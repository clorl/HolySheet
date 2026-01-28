<script>
import { page } from '$app/state';
import { getComponent, createSheet, createPage } from '$lib/sheet';
let { page, sheetData = $bindable() } = $props();

let id = $derived(page.params.id);
let sheet = $state(null);

// MOCK FETCH FUNCTION
const getSheet = async (sheetId) => {
	// Simulating PocketBase delay
	await new Promise(r => setTimeout(r, 400));
	return createSheet({
		id: sheetId,
		name: "Torbek",
		pages: [
			createPage({ order: 0, backgroundUrl: '/sheet-1.jpg' }),
			createPage({ order: 1, backgroundUrl: '/sheet-2.jpg' }),
			createPage({ order: 2, backgroundUrl: '/sheet-3.jpg' })
		]
	});
};

$effect(() => {
	getSheet(id).then(res => sheet = res);
});
</script>

{#if sheet && sheet?.pages?.length}
<div class="flex flex-col items-center gap-8 p-4 bg-base-300 min-h-screen">
<!-- <h1 class="text-2xl font-bold">{sheet.name}</h1> -->

{#each sheet.pages as p}
<div class="relative shadow-2xl border border-base-content/10 bg-white">
	<img src={p.backgroundUrl} alt="Sheet Page" class="w-[800px] block" />

	<div class="absolute inset-0">
		{#each page.elements as el (el.id}
			<svelte:component
							this={getComponent(el.type)}
							config={el}
							bind:value={sheetData[el.dataKey]}
			/>
		{/each}
	</div>
</div>
{/each}
</div>
{/if}
