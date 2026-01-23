<script>
let {
	name,
	type="text",
	label,
	placeholder="",
	required=false,
	validatorHint="",
	value=$bindable(),
	children,
} = $props();
</script>


<div class="form-control">
	<label class="label" for={name}>
		<span class="label-text">{label}</span>
	</label>
	<input 
		bind:value={value} 
		name={name}
		type={type || 'text'} 
		placeholder={placeholder}
		required={required}
		class="input input-bordered"
	/>
	{#if validatorHint}
		<p class="validator-hint hidden">
			{validatorHint}
		</p>
	{/if}
	{@render children?.()}
</div>
