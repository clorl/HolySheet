/**
 * @module Sheet
 * @description Model and logic for character sheets
 */

/**
 * Factory for a Page element
 */
export const createElement = (opts = {}) => ({
	id: opts.id || crypto.randomUUID(),
	type: opts.type || 'text',
	x: opts.x || 0,
	y: opts.y || 0,
	dataKey: opts.dataKey || id, 
	zIndex: opts.zIndex || 1,
	style: opts.style || "",
});

/**
 * Factory for a Page
 */
export const createPage = (opts = {}) => ({
    id: opts.id || crypto.randomUUID(),
    backgroundUrl: opts.backgroundUrl || 'https://placehold.co/900x1600?text=Page',
    order: opts.order ?? 0
		elements: opts.elements || [];
});

/**
 * Factory for a Sheet
 */
export const createSheet = (opts = {}) => ({
    id: opts.id || crypto.randomUUID(),
    name: opts.name || "Unnamed Sheet",
    pages: (opts.pages || [createPage()]).sort((a, b) => a.order - b.order),
		data: opts.values || []
});

import TextField from './components/sheet/elements/TextField.svelte'

export function getComponent(elType) {
	return ({
		text: TextField
	})[elType] || TextField;
}
