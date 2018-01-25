import { Component, OnInit, Injector } from '@angular/core';
import { Image } from '../../data/models';
import { PortraitActions } from '../portrait.actions';

@Component({
	selector: 'app-image-add',
	templateUrl: './image-add.component.html',
	styleUrls: ['./image-add.component.css']
})
export class ImageAddComponent {
	private close: () => void;

	public image: { name: string; image: string } = { name: '', image: '' };

	constructor(private injector: Injector, private portraitActions: PortraitActions) {
		this.close = this.injector.get('close');
	}

	onSubmit() {
		// TODO: Validate.
		this.portraitActions.addPortrait(new Image(this.image.name, this.image.image));
		this.close();
	}
}
