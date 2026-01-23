import { fail, redirect } from '@sveltejs/kit';
import { dev } from "$app/navigation";

export const actions = {
    login: async ({ request, locals }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            await locals.pb.collection('users').authWithPassword(email, password);
        } catch (err) {
						dev && console.log(err);
            return fail(400, { 
                error: 'Invalid credentials. Check your email and password.',
								details: err.data?.data || {},
                email,
								rawData: JSON.stringify(err, null, 2)
            });
        }

        throw redirect(303, '/');
    },

    signup: async ({ request, locals }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        const passwordConfirm = formData.get('passwordConfirm');
        const name = formData.get('name');

        if (password !== passwordConfirm) {
            return fail(400, { error: 'Passwords do not match', email, name });
        }

        try {
            await locals.pb.collection('users').create({
                email,
                password,
                passwordConfirm,
                name
            });

            await locals.pb.collection('users').authWithPassword(email, password);
        } catch (err) {
						if (dev)
							console.log(err);
            return fail(400, { error: "Something went wrong", details: err.data?.data || {},email, name, rawData: JSON.stringify(err, null, 2)});
        }

        throw redirect(303, '/');
    },

	logout: ({ locals }) => {
        locals.pb.authStore.clear();
        locals.user = null;
        throw redirect(303, '/');
	}
};
