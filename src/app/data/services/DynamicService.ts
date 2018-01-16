import { IService } from '../core/IService';
import { IEntity } from '../core/IEntity';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export class DynamicService<Entity extends IEntity>
	implements IService<string, Entity> {
	private readonly source: Map<string, Entity> = new Map<string, Entity>();

	get(id: string): Entity {
		return this.source.get(id);
	}

	add(entity: Entity): string {
		entity.setId((this.source.size + 1).toString());
		this.source.set(entity.getId(), entity);

		return entity.getId();
	}

	find(predicate: (value: Entity) => boolean): Entity {
		let result = null;
		this.source.forEach((value, key) => {
			if (predicate(value)) {
				result = value;
				return;
			}
		});

		return result;
	}
	all(): Entity[] {
		const all: Entity[] = new Array<Entity>();
		this.source.forEach((value, key) => {
			all.push(value);
		});

		return all;
	}

	edit(id: string, entity: Entity): void {
		entity.setId(id);
		this.source.set(id, entity);
	}

	delete(id: string): Entity {
		const entity: Entity = this.source.get(id);
		this.source.delete(id);

		return entity;
	}
}
