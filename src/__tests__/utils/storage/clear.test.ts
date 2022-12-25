import {clear, set} from '../../../utils/storage';
import { LocalStorageMock } from '../../../mocks/localStorageMock';

describe('clear', () => {
  beforeEach(() => {
    (global as any).localStorage = new LocalStorageMock();

    set('key1', 'value1');
    set('key2', 'value2');
  });

  it('should clear all items from local storage', () => {
    clear();

    expect(localStorage.length).toBe(0);
  });
});
