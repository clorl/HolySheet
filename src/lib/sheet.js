/**
 * @module Sheet
 * @description Model and logic for character sheets
 */

export const CanvasItem = {
	new: (opts = {}) => ({
		id: crypto.randomUUID(),
		type: "text",
		name: "",
		label: "",
		value: "",
		x: 0,
		y: 0,
		w: 10,
		h: 10,
		fontSize: 25,
		zIndex: 3,
		color: "#000000",
		meta: {
			x: "number",
			y: "number",
			w: "number",
			h: "number",
			fontSize: "number",
			color: "color"
		},
		...opts,
	})
};

export const Page = {
	new: (opts = {}) => ({
		id: crypto.randomUUID(),
		title: "Page",
		backgroundImage: "",
		items: [],
		...opts,
	})
};

export const Sheet = {
	new: (opts = {}) => ({
		id: crypto.randomUUID(),
		name: "John McCharacter",
		pages: [],
		data: {},
		...opts
	})
};
