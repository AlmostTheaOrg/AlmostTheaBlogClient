import { IEntity } from "./IEntity";
import { Image } from "./Image";

export class Category implements IEntity {
  private id: string;

  constructor(private name: string, private thumbnail: Image) {}

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  getThumbnail(): Image {
    return this.thumbnail;
  }

  getImages(): Iterable<Image> {
    return null;
  }
}
