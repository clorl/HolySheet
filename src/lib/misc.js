/**
 * @module Misc
 * @description Collection of helper functions (all pure), they should be moved to their own modules eventually
 */

/**
 * Returns a random element from an array.
 * @param {Array} arr - The array to pick from.
 * @returns {*} - A random element, or null if empty/invalid.
 */
export function pickRandom(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}
