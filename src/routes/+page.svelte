<script>
    import { onMount } from 'svelte';
    import { pb } from '$lib/pb';
    import Uploader from '$lib/components/Uploader.svelte';

    let sheets = $state([]);
    let selectedSheetUrl = $state(null);

    async function loadSheets() {
        if (pb.authStore.isValid) {
            sheets = await pb.collection('charsheets').getFullList({ sort: '-created' });
        }
    }

    function getPdfUrl(record) {
        // Generates the public URL for the file
        return pb.files.getURL(record, record.pdf_file);
    }

    onMount(loadSheets);
</script>

<main class="p-8 max-w-4xl mx-auto space-y-8">
    <header class="flex justify-between items-center">
        <h1 class="text-3xl font-bold font-retro">App</h1>
    </header>

    {#if pb.authStore.isValid}
        <Uploader />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
                <h2 class="text-xl font-bold">Your Sheets</h2>
                {#each sheets as sheet}
                    <button 
                        class="btn btn-outline w-full justify-start"
                        onclick={() => selectedSheetUrl = getPdfUrl(sheet)}
                    >
                        {sheet.name}
                    </button>
                {/each}
            </div>

            <div class="bg-base-300 rounded-lg min-h-[500px] flex items-center justify-center overflow-hidden">
                {#if selectedSheetUrl}
                    <iframe src={selectedSheetUrl} class="w-full h-full" title="PDF Viewer"></iframe>
                {:else}
                    <p class="text-base-content/50">Select a sheet to view</p>
                {/if}
            </div>
        </div>
    {:else}
        <div class="alert alert-info text-center">Please login to manage your sheets.</div>
    {/if}
</main>
