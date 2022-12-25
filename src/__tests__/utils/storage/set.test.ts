import {set} from '../../../utils/storage';

import { LocalStorageMock } from '../../../mocks/localStorageMock';

describe('set', () => {
  beforeEach(() => {
    // Assign the mock to the global localStorage variable
    (global as any).localStorage = new LocalStorageMock();
    localStorage.clear();
  });

  it('should set a value in local storage', () => {
    set('key', 'value');
    expect(localStorage.getItem('key')).toEqual('"value"');
  });

  it('should stringify objects before storing them', () => {
    set('key', { foo: 'bar' });
    expect(localStorage.getItem('key')).toEqual('{"foo":"bar"}');
  });
});
