/**
 * Picks a random element in the given array
 * @param {Array} arr
 * @return A random picked element
 */
export function pickRandom(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}
