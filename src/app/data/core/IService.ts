export interface IService<TKey, TValue> {
	get(entity: TKey): TValue;

	find(predicate: (value: TValue) => boolean): TValue;

	all(): TValue[];

	add(entity: TValue): TKey;

	edit(id: TKey, entity: TValue): void;

	delete(id: TKey): TValue;
}
