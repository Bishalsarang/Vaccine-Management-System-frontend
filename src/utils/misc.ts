/**
 * Returns the value of the first argument if it is not empty or null,
 * and returns the fallback value (second argument) if the first argument is empty or null.
 *
 * @param {string|null} value - The value to check.
 * @param {string} fallbackValue - The fallback value.
 * @return {string} The value of the first argument if it is not empty or null,
 * or the fallback value if the first argument is empty or null.
 */
export function getValueOrFallback(
  value: string | undefined,
  fallbackValue: string,
): string {
  return value ? value : fallbackValue;
}
