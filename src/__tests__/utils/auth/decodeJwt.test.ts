import { decodeJWT } from '../../../utils/auth';

describe('decodeJWT', () => {
  const falseValues = [null, undefined, ''];

  falseValues.forEach(value => {
    it(`should return null if the token is ${value}`, () => {
      expect(decodeJWT(value)).toBe(null);
    });
  })
 

  it('should return null if the token is not a valid JWT', () => {
    expect(decodeJWT('random-string')).toBe(null);
  });
});
