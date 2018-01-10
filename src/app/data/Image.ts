import { IEntity } from "./IEntity";

export class Image implements IEntity {
  private id: string;

  constructor(private name: string, private imageUrl: string) {}

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getImageSrc(): string {
    return this.imageUrl;
  }

  getName(): string {
    return this.name;
  }
}
