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


  it('should return the decoded payload if the token is a valid JWT', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const decoded = decodeJWT(token);
    expect(decoded).toEqual({
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022,
    });
  });
});
