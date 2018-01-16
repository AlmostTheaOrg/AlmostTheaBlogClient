import { Component, OnInit, Injector } from '@angular/core';
import { ImageService } from '../../data/services';
import { Image } from '../../data/models';

@Component({
	selector: 'app-image-add',
	templateUrl: './image-add.component.html',
	styleUrls: ['./image-add.component.css']
})
export class ImageAddComponent {
	private close: () => void;

	public image: { name: string; image: string } = { name: '', image: '' };

	constructor(private injector: Injector, private imageService: ImageService) {
		this.close = this.injector.get('close');
	}

	onSubmit() {
		// TODO: Validate.
		this.imageService.add(new Image(this.image.name, this.image.image));
		this.close();
	}
}
