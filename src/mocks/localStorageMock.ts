/**
 * Mock of the localStorage object for testing purposes.
 */
export class LocalStorageMock {
  /**
   * The store of key-value pairs for the mock local storage.
   */
  private store: { [key: string]: string } = {};

  /**
   * Clears all key-value pairs from the mock local storage.
   */
  public clear(): void {
    this.store = {};
  }

  /**
   * Returns the value for the specified key in the mock local storage.
   * @param key The key to look up in the mock local storage.
   * @returns The value for the specified key, or null if the key is not found.
   */
  public getItem(key: string): string | null {
    return this.store[key] || null;
  }

  /**
   * Sets the value for the specified key in the mock local storage.
   * @param key The key to set in the mock local storage.
   * @param value The value to set for the key.
   */
  public setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  /**
   * Removes the key-value pair for the specified key from the mock local storage.
   * @param key The key to remove from the mock local storage.
   */
  public removeItem(key: string): void {
    delete this.store[key];
  }

  get length() {
    return Object.keys(this.store).length;
  }
}
