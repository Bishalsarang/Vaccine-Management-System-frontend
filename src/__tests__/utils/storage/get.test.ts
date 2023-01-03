import { get,set } from '../../../utils/storage';
import { LocalStorageMock } from '../../../mocks/localStorageMock';


describe('get', () => {
  beforeEach(() => {
    // Assign the mock to the global localStorage variable
    (global as any).localStorage = new LocalStorageMock();
    localStorage.clear();
  });

  it('should return null if the key is not set', () => {
    expect(get('non-existent-key')).toBe(null);
  });

  it('should return the stored value if the key is set', () => {
    set('key', 'value');
    expect(get('key')).toBe('value');
  });

  it('should return a parsed value if the stored value is a JSON string', () => {
    set('key', {"foo": "bar"});
    expect(get('key')).toEqual({ foo: 'bar' });
  });
  
  test('It should return the value for a key with invalid JSON value', () => {
    // Set an invalid JSON value in localStorage
    set('key', '{"invalid":json}');

    // Test the get function
    const value = get('key');
    expect(value).toEqual('{"invalid":json}');
  });
});


