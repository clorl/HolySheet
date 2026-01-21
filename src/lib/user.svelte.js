
import { dev } from '$app/environment';
import { pb } from './pb';
import { invalidateAll } from "$app/navigation";

const state = $state({
	user: pb.authStore.model,
	loading: false,
	error: null,
	isLoggedIn: pb.authStore.isValid,

	get avatarUrl() {
		if (!this.user) return "";
		if (!this.user.avatar) return "https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=" + this.user.id;
		return pb.files.getUrl(this.user, this.user.avatar, {
			thumb: "64x64"
		});
	},

	async createUser(name, email, password, passwordConfirm) {
		try {
			const storageRecord = await pb.collection('userStorage').create();

			await pb.collection('users').create({
				name,
				email,
				password,
				passwordConfirm,
				storage: storageRecord.id
			});
			return null;
		} catch (err) {
			return err;
		}
	},

	async login(email, password) {
		try {
			const res = await pb.collection('users').authWithPassword(email, password);
			this.user = res.record;
			return null;
		} catch(e) {
			return e;
		}
	},

	logout() {
		pb.authStore.clear();
		this.user = null;
		//invalidateAll();
	}
});

export default state;
