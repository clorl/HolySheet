/**
 * @module User
 * @description Logic for authentication and user data presentation.
 */
import { pb } from '$lib/pb';
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { dev } from '$app/environment';

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((token, model) => {
	if (dev) {
	console.log(`Auth changed`);
	console.log(model);
	}
    currentUser.set(model);
});

export async function login(email, password, redirectTo="/") {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        if (redirectTo) {
					goto(redirectTo);
				}
        return { result: true, authData };
    } catch (err) {
				dev && console.log(err);
        return { result: false, error: err.message };
    }
}

export async function register(email, password, passwordConfirm, name, redirectTo="/") {
    try {
        await pb.collection('users').create({
            email,
            password,
            passwordConfirm,
            name,
        });
        // Immediately log in after resultful signup
        return await login(email, password, redirectTo);
    } catch (err) {
				dev && console.log(err);
        return { result: false, error: err.message };
    }
}

export async function resetPassword(email) {
    try {
        await pb.collection('users').requestPasswordReset(email);
        return { result: true };
    } catch (err) {
				dev && console.log(err);
        return { result: false, error: err.message };
    }
}

export function logout() {
    pb.authStore.clear();
    goto('/');
}

export function getAvatar(userRecord) {
    if (!userRecord || !userRecord.avatar) {
        const seed = userRecord?.name || userRecord?.email || 'Guest';
        return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(seed)}`;
    }
    
    return pb.files.getUrl(userRecord, userRecord.avatar, { thumb: '100x100' });
}
