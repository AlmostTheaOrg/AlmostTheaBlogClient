import { Component, OnInit, Injector } from '@angular/core';
import { PortraitActions } from '../portrait.actions';

@Component({
	selector: 'app-image-delete',
	templateUrl: './image-delete.component.html',
	styleUrls: ['./image-delete.component.css']
})
export class ImageDeleteComponent {
	public image;
	private close;

	constructor(private injector: Injector, private portraitActions: PortraitActions) {
		this.image = {
			id: this.injector.get('id'),
			name: this.injector.get('name')
		};

		this.close = this.injector.get('close');
	}

	onSubmit(event: Event) {
		event.preventDefault();

		this.portraitActions.deletePortrait(this.image.id);
		this.close();
	}
}
