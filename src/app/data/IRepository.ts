export interface IRepository<TKey, TValue> {
  get(entity: TKey): TValue;

  all(): TValue[];

  add(entity: TValue): TKey;

  edit(id: TKey, entity: TValue): void;

  delete(id: TKey): TValue;
}
