<script>
    import { pb } from '$lib/pb';
    let fileInput;
		let isUploading = false;
		let errMsg = "";

    async function upload() {
        const file = fileInput.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('pdf_file', file);
        formData.append('name', file.name);
        formData.append('owner', pb.authStore.model.id);
				isUploading = true;

        try {
            await pb.collection('charsheets').create(formData);
						isUploading = false;
            alert("Upload successful!");
            location.reload(); // Simple way to refresh the list
        } catch (err) {
            console.error(err);
						errMsg += err;
						isUploading = false;
        }
    }
</script>

<div class="flex flex-col gap-2 p-4 border rounded-lg bg-base-100">
    <input type="file" bind:this={fileInput} class="file-input file-input-bordered w-full" />
    <button class="btn btn-accent" onclick={upload} disabled={isUploading}>Upload Sheet</button>
		<div role="alert" class="{errMsg != "" ? "visible" : "invisible"} alert alert-error">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<span>{errMsg}</span>
		</div>
</div>
