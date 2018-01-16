import { Component, OnInit, Injector } from '@angular/core';
import { ImageService } from '../../data/services';
import { Image } from '../../data/models';

@Component({
	selector: 'app-image-edit',
	templateUrl: './image-edit.component.html',
	styleUrls: ['./image-edit.component.css']
})
export class ImageEditComponent {
	public image: { id: string; name: string; image: string };
	private close;

	constructor(private injector: Injector, private imageServices: ImageService) {
		this.image = {
			id: this.injector.get('id'),
			name: this.injector.get('name'),
			image: this.injector.get('imageSrc')
		};

		this.close = this.injector.get('close');
	}

	onSubmit() {
		this.imageServices.edit(
			this.image.id,
			new Image(this.image.name, this.image.image)
		);

		this.close();
	}
}
