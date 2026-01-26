import { pb, user } from '$lib/pocketbase';
import { goto } from '$app/navigation';

export default {
	async login(email, password) {
		try {
			const authData = await pb.collection('users').authWithPassword(email, password);
			return { success: true, data: authData };
		} catch (error) {
			return { success: false, error: error};
		}
	},

	async register(email, password, passwordConfirm) {
		try {
			await pb.collection('users').create({
				name,
				email,
				password,
				passwordConfirm,
			});
			return await this.login(email, password);
		} catch (error) {
			return { success: false, error: error};
		}
	},

	logout() {
		pb.authStore.clear();
		goto('/');
	}
};
