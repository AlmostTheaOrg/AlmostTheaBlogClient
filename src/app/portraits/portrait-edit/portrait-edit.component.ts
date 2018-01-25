import { Component, OnInit, Injector } from '@angular/core';
import { ImageService } from '../../data/services';
import { Image } from '../../data/models';
import { PortraitActions } from '../portrait.actions';

@Component({
	selector: 'app-portrait-edit',
	templateUrl: './portrait-edit.component.html',
	styleUrls: ['./portrait-edit.component.css']
})
export class PortraitEditComponent {
	public portrait: { id: string; name: string; image: string };
	private close;

	constructor(private injector: Injector, private portraitActions: PortraitActions) {
		this.portrait = {
			id: this.injector.get('id'),
			name: this.injector.get('name'),
			image: this.injector.get('imageSrc')
		};

		this.close = this.injector.get('close');
	}

	onSubmit() {
		this.portraitActions.editPortrait(
			this.portrait.id,
			new Image(this.portrait.name, this.portrait.image)
		);

		this.close();
	}
}
