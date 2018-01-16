import { Component, OnInit, Injector } from '@angular/core';
import { ImageService } from '../../data/services';

@Component({
	selector: 'app-image-delete',
	templateUrl: './image-delete.component.html',
	styleUrls: ['./image-delete.component.css']
})
export class ImageDeleteComponent {
	public image;
	private close;

	constructor(private injector: Injector, private imageRepository: ImageService) {
		this.image = {
			id: this.injector.get('id'),
			name: this.injector.get('name')
		};

		this.close = this.injector.get('close');
	}

	onSubmit(event: Event) {
		event.preventDefault();

		this.imageRepository.delete(this.image.id);
		this.close();
	}
}
