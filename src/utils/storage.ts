/**
 * Sets a value in local storage.
 *
 * @param {string} key The key to use for the value.
 * @param {string | unknown} value The value to set.
 */
export function set(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Gets a value from local storage.
 *
 * @param {string} key The key for the value to retrieve.
 * @returns {string} The value stored under the specified key.
 */
export function get(key: string): string | null {
  const item = localStorage.getItem(key);

  if (!item) {
    return item;
  }

  try {
    return JSON.parse(item);
  } catch (error) {
    return item;
  }
}

/**
 * Clears  values from local storage.
 */
export function clear() {
  localStorage.clear();
}
