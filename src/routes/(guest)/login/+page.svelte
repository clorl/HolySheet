<script>
import { redirect } from '@sveltejs/kit';
import ErrorIcon from "$lib/components/icons/Error.svelte";
import auth from "$lib/user.svelte.js";

let email = $state('');
let password = $state('');

const redirectTo = "/";

async function submit() {
	await auth.login(email, password);
	if (!auth.error && !auth.loading) {
		try {
			redirect(307, '/');
		} catch (e) {
			console.log(e);
		}
	}
}
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left px-6">
      <h1 class="text-5xl font-bold">Welcome Back!</h1>
      <p class="py-6">Log in to access your dashboard and continue where you left off.</p>
    </div>

    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

			{#if auth.error}
				{#key auth.error}
					<div role="alert" class="alert alert-error">
						<ErrorIcon />
						<span>{auth.error.status === 400 ? "Unknown email or wrong password" : auth.error}</span>
					</div>
				{/key}
			{/if}

      <form method="POST" action="" class="card-body">
        <div class="form-control">
          <label class="label" for="login-email">
            <span class="label-text">Email</span>
          </label>
          <input bind:value={email} name="email" type="email" id="login-email" placeholder="email@example.com" class="input input-bordered" required />
        </div>

        <div class="form-control">
          <label class="label" for="login-password">
            <span class="label-text">Password</span>
          </label>
          <input bind:value={password} name="password" type="password" id="login-password" placeholder="|>455\/\/02|)" class="input input-bordered" required />
          <label class="label">
            <a href="" class="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>

        <div class="form-control mt-6">
					{#if auth.loading}
						<span class="loading loading-spinner loading-md"></span>
					{/if}
          <button onclick={submit} class="btn btn-primary {auth.loading ? "btn-disabled" : ''}">{auth.loading  ? "Logging in..." : "Log In"}</button>
        </div>

        <div class="divider">OR</div>

        <button class="btn btn-outline btn-secondary btn-disabled">
          Login with Google
        </button>

        <label class="label justify-center">
          <span class="label-text-alt">New here? 
            <a href="/signup" class="link link-hover link-primary font-semibold">Create account</a>
          </span>
        </label>
      </form>

    </div>
  </div>
</div>
