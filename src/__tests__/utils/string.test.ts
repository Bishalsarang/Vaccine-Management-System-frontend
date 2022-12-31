import { interpolate } from '../../utils/string';

describe('interpolate', () => {
  it('should interpolate the string with the given parameters', () => {
    const str = ':name is here.';
    const params = { name: 'Barbara' };
    const expectedInterpolatedString = 'Barbara is here.';

    const interpolatedString = interpolate(str, params);
    expect(interpolatedString).toEqual(expectedInterpolatedString);
  });

  it('should return the original string if no parameters are given', () => {
    const str = ':name is here.';
    const expectedInterpolatedString = ':name is here.';

    const interpolatedString = interpolate(str);
    expect(interpolatedString).toEqual(expectedInterpolatedString);
  });

  it('should return the original string if the parameters do not match any placeholders', () => {
    const str = ':name is here.';
    const params = { age: 30 };
    const expectedInterpolatedString = ':name is here.';

    const interpolatedString = interpolate(str, params);
    expect(interpolatedString).toEqual(expectedInterpolatedString);
  });
});
