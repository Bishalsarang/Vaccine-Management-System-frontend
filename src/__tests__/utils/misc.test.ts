import { ERROR_MESSAGE } from "../../utils/misc";

describe('ERROR_MESSAGE', () => {
  it('should return the correct error message for MAX_LENGTH', () => {
    const field = 'Username';
    const length = 10;
    const expectedMessage = `${field}  must be ${length} character or less.`;

    const result = ERROR_MESSAGE.MAX_LENGTH(field, length);
    expect(result).toEqual(expectedMessage);
  });

  it('should return the correct error message for MIN_LENGTH', () => {
    const field = 'Password';
    const length = 8;
    const expectedMessage = ` ${field} must be at least ${length} characters.`;

    const result = ERROR_MESSAGE.MIN_LENGTH(field, length);
    expect(result).toEqual(expectedMessage);
  });

  it('should return the correct error message for POSITIVE_INTEGERL', () => {
    const field = 'Age';
    const expectedMessage = `${field} must be a positive integer.`;

    const result = ERROR_MESSAGE.POSITIVE_INTEGERL(field);
    expect(result).toEqual(expectedMessage);
  });
});
