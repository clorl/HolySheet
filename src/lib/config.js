/**
 * @module Config 
 * @description Provides global config variables for the app
 */
import { dev } from '$app/environment';

export default {
	pocketbaseUrl: dev ? "http://127.0.0.1:8090" : ""
};
