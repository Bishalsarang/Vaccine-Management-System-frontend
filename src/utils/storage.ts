/**
 * Sets a value in local storage.
 *
 * @param {string} key The key to use for the value.
 * @param {string} value The value to set.
 */
export function set(key: string, value: string) {
  localStorage.setItem(key, value);
}

/**
 * Gets a value from local storage.
 *
 * @param {string} key The key for the value to retrieve.
 * @returns {string} The value stored under the specified key.
 */
export function get(key: string): string | null {
  return localStorage.getItem(key);
}

/**
 * Clears  values from local storage.
 */
export function clear() {
  localStorage.clear();
}
