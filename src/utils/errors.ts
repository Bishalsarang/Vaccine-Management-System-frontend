export const ERROR_MESSAGE = {
  MAX_LENGTH: (field: string, length: number) =>
    `${field}  must be ${length} character or less.`,
  MIN_LENGTH: (field: string, length: number) =>
    ` ${field} must be at least ${length} characters.`,
};
