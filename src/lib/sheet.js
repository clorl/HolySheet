export const fieldTypes = {
	"text": 0,
	"toggle": 1
}

export function createOverlay: (x=0, y=0, options = {}) => {
	position: {
		x: Number(x.toFixed(2)),
		y: Number(y.toFixed(2))
	},
	size: {
		w: options.w || 12,
		h: options.y || 6
	},

	style: {
	}
}

// Defines the schema of the layout json data
export function createField: (type = fieldTypes.text, x=0, y=0, options = {}) => {
	...createOverlay(x, y, options),
	id: crypto.randomUUID(),
	key: "str",
	type: type,
	value: ""
}

export function getOverlayStyle: ov => {
	if (!ov || !ov.position) return "";

	return `
	position: absolute;
	left: ${ov.position.x}%;
	top: ${ov.position.y}%;
	width: ${ov.size.w}%;
	height: ${ov.size.h}%;
	display: flex;
	align-items: center;
	`;
};
