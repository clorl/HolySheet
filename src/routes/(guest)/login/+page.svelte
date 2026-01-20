<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left px-6">
      <h1 class="text-5xl font-bold">Welcome Back!</h1>
      <p class="py-6">Log in to access your dashboard and continue where you left off.</p>
    </div>

    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form class="card-body">
        <div class="form-control">
          <label class="label" for="login-email">
            <span class="label-text">Email</span>
          </label>
          <input type="email" id="login-email" placeholder="email@example.com" class="input input-bordered" required />
        </div>

        <div class="form-control">
          <label class="label" for="login-password">
            <span class="label-text">Password</span>
          </label>
          <input type="password" id="login-password" placeholder="password" class="input input-bordered" required />
          <label class="label">
            <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>

        <div class="form-control mt-6">
          <button class="btn btn-primary">Login</button>
        </div>

        <div class="divider">OR</div>

        <button class="btn btn-outline btn-secondary">
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
