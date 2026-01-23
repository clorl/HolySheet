// A getter module to make accessing user data easier and coherent throughout the app

import { pb } from '$lib/pb';
import { page } from '$app/state';

export const user = {
	get isLoggedIn() {
		return pb.authStore.isValid && page.data.user;
	},
	get data() {
		return page.data.user;
	},
	get avatarUrl() {
	return this.data().avatar
			? `${pb.baseUrl}/api/files/_pb_users_auth_/${user.id}/${user.avatar}?thumb=100x100`
				: `https://ui-avatars.com/api/?name=${user?.name || user?.email}&background=random`
	}
}
