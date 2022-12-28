export interface IdParams {
  id: number | null;
}

export interface DialogOptions<T> {
  data: T;
  isOpen: boolean;
  mode: 'create' | 'edit' | 'delete';
}
