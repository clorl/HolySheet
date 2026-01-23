import PocketBase from 'pocketbase';

export const handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase('http://127.0.0.1:8090');

    // Load auth state from cookie
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // Refresh session if valid
        if (event.locals.pb.authStore.isValid) {
            await event.locals.pb.collection('users').authRefresh();
            // Clone the user model so it's accessible in routes
            event.locals.user = event.locals.pb.authStore.model;
        }
    } catch (err) {
				console.error(err);
        event.locals.pb.authStore.clear();
        event.locals.user = null;
    }

			const isLoggedIn = event.locals.pb.authStore.isValid;
			const routeId = event.route.id || '';

		if (routeId.includes('(guest)') && isLoggedIn) {
			throw redirect(303, '/');
		}

		if (routeId.includes('(auth)') && !isLoggedIn) {
			throw redirect(303, '/');
		}

    const response = await resolve(event);

    // Export state back to cookie for the browser
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({ httpOnly: false }));

    return response;
};
