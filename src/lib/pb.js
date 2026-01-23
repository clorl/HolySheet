import PocketBase from 'pocketbase';
import config from '$lib/config';

export const pb = new PocketBase(config.pocketbaseUrl);
export function create() {
	return new PocketBase(config.pocketbaseUrl);
}
