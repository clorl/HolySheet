import { pb } from './pb';

const state = $state({
    user: pb.authStore.model,
		loading: false,
    isLoggedIn: pb.authStore.isValid,

		get avatarUrl() {
			if (!this.user) return "";
			if (!this.user.avatar) return "https://api.dicebear.com/9.x/lorelei-neutral/svg?backgroundColor=c0aede?flip=true?seed={user.id}";
			return pb.files.getUrl(this.user, this.user.avatar, {
				thumb: "64x64"
			});
		},

		async login(email, password) {
				this.loading = true;
				try {
						const res = await pb.collection('users').authWithPassword(email, password);
						this.user = res.record;
				} catch(e) {
				} finally {
						this.loading = false;
				}
		},

		logout() {
				pb.authStore.clear();
				this.user = null;
		}
});

export default state;
