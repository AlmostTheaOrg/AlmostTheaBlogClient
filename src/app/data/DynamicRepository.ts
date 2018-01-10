import { IRepository } from "./IRepository";
import { IEntity } from "./IEntity";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

export class DynamicRepository<Entity extends IEntity>
  implements IRepository<string, Entity> {
  private readonly source: Map<string, Entity> = new Map<string, Entity>();

  get(id: string): Entity {
    return this.source.get(id);
  }

  add(entity: Entity): string {
    entity.setId((this.source.size + 1).toString());
    this.source.set(entity.getId(), entity);

    return entity.getId();
  }

  all(): Entity[] {
    let all: Entity[] = new Array<Entity>();
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
    let entity: Entity = this.source.get(id);
    this.source.delete(id);

    return entity;
  }
}
