<script>
import auth from "$lib/user.svelte.js";
import ErrorIcon from "$lib/components/icons/Error.svelte"
import { page } from '$app/state';
import { redirect } from '@sveltejs/kit';


const redirectTo = $derived(page.url.searchParams.get('redirectTo') || '/');

let loading = $state(false);

let confirmPasswordInput = $state();
let name = $state('');
let email = $state('');
let password = $state('');
let confirmPass = $state('');
let errorMsg = $state('');
let successMsg = $state('');

$effect(() => {
	if (!confirmPasswordInput) return;
	confirmPasswordInput.setCustomValidity(password !== confirmPass ? "Passwords do not match" : "");
});

async function submit(e) {
	e.preventDefault()
	loading = true;
	errorMsg = false;
	successMsg = false;

	let err = await auth.createUser(name, email, password, confirmPass);
	if (err) {
		errorMsg = "Something went wrong";
		console.log(err);
		return;
	}
	successMsg = "Account created, logging you in";
	await new Promise((res) => setTimeout(res, 2000));

	err = await auth.login(email, password);
	if (err) {
		errorMsg = err;
		console.log(err);
		return;
	}
	redirect(307, redirectTo);
}

</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left px-6">
      <h1 class="text-5xl font-bold">Create Account</h1>
      <p class="py-6">Join our community today! It only takes a minute to get started with your new profile.</p>
    </div>
    
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			{#if errorMsg}
				<div role="alert" class="alert alert-error">
					<ErrorIcon />
					<span>{errorMsg}</span>
				</div>
			{/if}

			{#if successMsg}
				<div role="alert" class="alert alert-success">
					<span>{successMsg}</span>
				</div>
			{/if}

      <form class="card-body" onsubmit={submit}>
        <div class="form-control">
          <label class="label" for="name">
            <span class="label-text">Username</span>
          </label>
          <input bind:value={name} type="text" id="name" placeholder="Jane Doe" class="input input-bordered validator" pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="50" required />
					<p class="validator-hint hidden">
						Must be 3 to 50 characters
						<br/> Only letters, numbers or dashes
					</p>
        </div>
        
        <div class="form-control">
          <label class="label" for="email">
            <span class="label-text">Email</span>
          </label>
          <input bind:value={email} type="email" id="email" placeholder="email@example.com" class="input input-bordered validator" required />
					<p class="validator-hint hidden">
						Must be a valid email address
					</p>
        </div>
        
        <div class="form-control">
          <label class="label" for="password">
            <span class="label-text">Password</span>
          </label>
          <input bind:value={password} type="password" id="password" placeholder="password" class="input input-bordered validator" minlength="8" pattern={"(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"} required />
					<p class="validator-hint hidden">
						At least 8 characters, including:
						<br>At least one number
						<br>At least one uppercase letter
						<br>At least one lowercase letter
					</p>
        </div>

        <div class="form-control">
          <label class="label" for="confirmPass">
            <span class="label-text">Confirm password</span>
          </label>
          <input bind:this={confirmPasswordInput} bind:value={confirmPass} type="password" id="confirmPass" placeholder="password" class="input input-bordered" required />
					<p class="validator-hint hidden">
						Must be the same as the password field
					</p>
        </div>
        
        <div class="form-control mt-6">
          <button type="submit" class="btn btn-primary {loading? "btn-disabled" : ""}">
						{#if loading}	
						<span class="loading loading-spinner loading-md"></span>
						{/if}
						Sign Up</button>
        </div>
        
        <label class="label justify-center">
          <span class="label-text-alt">Already have an account? 
            <a href="/login" class="link link-hover link-primary font-semibold">Login</a>
          </span>
        </label>
      </form>
    </div>
  </div>
</div>
