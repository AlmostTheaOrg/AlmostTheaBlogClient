import { IEntity } from '../core/IEntity';
import { Image } from './Image';

export class Project implements IEntity {
	private id: string;

	constructor(private name: string, private thumbnail: Image, private images?: Image[]) { }

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

	getImages(): Image[] {
		return new Array(...this.images);
	}
}
