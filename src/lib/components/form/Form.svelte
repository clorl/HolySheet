<script>
		import Field from '$lib/components/form/Field.svelte';
		import { enhance } from '$app/forms';
    let { children=null, fields = [], onSubmit, submitLabel = "Submit", error = null, ...rest } = $props();
    
    let values = $derived(
        Object.fromEntries(fields.map(f => [f.name, f.value || '']))
    );

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(values);
    }
</script>

<div class="card-body">
    {#if error}<p class="error">{error}</p>{/if}

    {#each fields as field}
			<Field {...field} {...rest}/>
    {/each}

		{#if !children}
    <button type="submit">{submitLabel}</button>
		{:else}
		{@render children()}
		{/if}
</div>
