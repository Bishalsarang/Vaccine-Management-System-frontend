/**
 * Formats a date string to a short form.
 *
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date string.
 */
export function formateDateToShort(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return formattedDate;
}
