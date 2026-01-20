import PocketBase from 'pocketbase';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase('http://127.0.0.1:8090');

    const authCookie = event.request.headers.get('cookie') || '';
    event.locals.pb.authStore.loadFromCookie(authCookie);

    try {
        if (event.locals.pb.authStore.isValid) {
            await event.locals.pb.collection('users').authRefresh();
        }
    } catch (_) {
        event.locals.pb.authStore.clear();
    }

    const isLoggedIn = event.locals.pb.authStore.isValid;
    const routeId = event.route.id || '';

    if (routeId.includes('(guest)') && !isLoggedIn) {
        throw redirect(303, '/my');
		}

    if (routeId.includes('(auth)') && isLoggedIn) {
        throw redirect(303, '/login');
    }

    return await resolve(event);
};
