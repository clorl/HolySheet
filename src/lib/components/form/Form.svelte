<script>
		import Field from '$lib/components/form/Field.svelte';
		import { enhance } from '$app/forms';
    let { children=null, values = $bindable(), fields = [], onSubmit, submitLabel = "Submit", error = null, ...rest } = $props();

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(values);
    }
</script>

<div class="card-body">
    {#if error}<p class="error">{error}</p>{/if}

    {#each fields as field}
			<Field {...field} {...rest} bind:value={values[field.name]}/>
    {/each}

		{#if !children}
    <button type="submit">{submitLabel}</button>
		{:else}
		{@render children()}
		{/if}
</div>
