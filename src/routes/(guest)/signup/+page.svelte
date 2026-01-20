<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left px-6">
      <h1 class="text-5xl font-bold">Create Account</h1>
      <p class="py-6">Join our community today! It only takes a minute to get started with your new profile.</p>
    </div>
    
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form class="card-body">
        <div class="form-control">
          <label class="label" for="name">
            <span class="label-text">Full Name</span>
          </label>
          <input type="text" id="name" placeholder="John Doe" class="input input-bordered" required />
        </div>
        
        <div class="form-control">
          <label class="label" for="email">
            <span class="label-text">Email</span>
          </label>
          <input type="email" id="email" placeholder="email@example.com" class="input input-bordered" required />
        </div>
        
        <div class="form-control">
          <label class="label" for="password">
            <span class="label-text">Password</span>
          </label>
          <input type="password" id="password" placeholder="password" class="input input-bordered" required />
        </div>
        
        <div class="form-control mt-6">
          <button class="btn btn-primary">Sign Up</button>
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
