<script>
import Form from '$lib/components/form/Form.svelte';
import { dev } from '$app/environment';
import { pickRandom } from '$lib/util';
import { page } from '$app/state';
import { goto } from '$app/navigation'; 
import { enhance } from '$app/forms';
import { fade, fly } from "svelte/transition";
import { login, signup } from "$lib/user";

let { form } = $props();
let loading = $state(false);

const AUTH_VIEWS = {
	login: {
		title: "Hey it's you!",
		desc: "Missed a session? Hope the GM isn't too mad!",
		submitLabel: "Log In",
		fields: [
			{name: "email", label: "E-mail or Username", required: true, placeholder: pickRandom(['bond.james.bond@outlook.com', 'gale4waterdeep@gmail.com', 'live.love.craft@gmail.com'])},
			{name: "password", label: "Password", type:"password", required: true, placeholder: "Password" },
		]
	},
	signup: {
		title: "Welcome to the party",
		desc: "Create your account to manage your character sheets. It's free!",
		submitLabel: "Sign Up",
		fields: [
			{name: "email", type:"email", label: "E-mail", required: true, placeholder: pickRandom(['bond.james.bond@outlook.com', 'gale4waterdeep@gmail.com', 'live.love.craft@gmail.com'])},
			{name: "name", label: "Username", required: true, placeholder: pickRandom(['L0RD_V0LD', 'Not Jergal', 'Muad Dib', 'just_a_bugbear'])},
			{name: "password", label: "Password", type:"password", required: true, placeholder: "Password" },
			{name: "passwordConfirm", label: "Confirm Password", type:"password", required: true, placeholder: "Same as above" },
		]
	},
	reset: {
		title: "Can't connect?",
		desc: "Enter your e-mail or username and we'll send a password reset link.",
		submitLabel: "Reset Password",
		fields: [
			{name: "email", label: "E-mail or Username", required: true },
		]
	}
};

const curView = $derived(page.url.searchParams.get('action') || 'login');
let { title, desc, submitLabel, fields } = $derived(AUTH_VIEWS[curView] || AUTH_VIEWS.login);
const disabled = $derived(loading);

function switchView(view) {
	goto(`?view=${view}`, { replaceState: true, keepFocus: true, noScroll: true });
}

if (dev) {
	$effect(() => {
		if (form?.error?.data) {
			console.log("Error");
			console.log(form.error.data);
		}
	});
}


function submit(e) {
	e.preventDefault();
	loading = true;
	switch (curView) {
		case "login":
			const { success, error } = await user.login(email, password);
		case "signup":
			const { success, error } = await user.register(email, password);
		case "reset":
			break;
	}
}
</script>


<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left px-6 lg:w-[500px] min-h-[160px] flex flex-col justify-center">
			{#key curView}
				<div in:fade={{ duration: 200 }}>
					<h1 class="text-5xl font-bold">{title}</h1>
					<p class="py-6">{desc}</p>
				</div>
			{/key}
		</div>

		{#key curView}
		<div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100" in:fly={{ x:20, duration: 300, delay: 50 }}>
			<form
				onsubmit={submit}
			>

				<Form 
					fields={fields}
					submitLabel={submitLabel}
				>
					{#if curView === "signup"}
						<label class="label justify-center">
							<span class="label-text-alt">Already have an account?
								<a href="?action=login" class="link link-hover link-primary font-semibold">Log In</a>
							</span>
						</label>
						<button class="btn btn-primary mt-6" type="submit">

							{#if loading}
							<span class="loading loading-spinner loading-md"></span>
							{/if}
								Sign Up</button>

					{:else if curView === "reset"}
						<label class="label justify-center">
							<span class="label-text-alt">Remember your password?
								<a href="?action=login" class="link link-hover link-primary font-semibold">Log In</a>
							</span>
						</label>
						<button class="btn btn-primary mt-6" type="submit">

							{#if loading}
							<span class="loading loading-spinner loading-md"></span>
							{/if}
								Reset Password</button>

					{:else}
						<label class="form-control label justify-center">
							<span class="label-text-alt">Can't Login?
								<a href="?action=reset" class="link link-hover link-primary font-semibold">Reset my password</a>
							</span>
						</label>
						<button class="btn btn-primary mt-6" type="submit" disabled={disabled}>
							{#if loading}
							<span class="loading loading-spinner loading-md"></span>
							{/if}
							Log In
						</button>

						<div class="divider">OR</div>

						<button class="btn btn-outline btn-secondary btn-disabled">
							Login with Google
						</button>

						<label class="label justify-center">
							<span class="label-text-alt">New here? 
								<a href="?action=signup" class="link link-hover link-primary font-semibold">Create account</a>
							</span>
						</label>

					{/if}
				</Form>
			</form>

			{#if form?.error}
				<div class="alert alert-error shadow-lg mb-4 px-2">
					<span>{form.error}</span>
				</div>
			{/if}

		</div>
		{/key}
	</div>
</div>
