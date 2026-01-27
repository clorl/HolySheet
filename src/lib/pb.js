/**
 * @module PB
 * @description Exposes a shared Pocketbase object instance
 */
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import * as config from "$lib/config";

export const pb = new PocketBase('/');
