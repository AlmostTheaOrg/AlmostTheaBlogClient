import { Component, OnInit, Injector, ElementRef, ViewChild } from '@angular/core';
import { PortraitActions } from '../portrait.actions';

@Component({
	selector: 'app-portrait-add',
	templateUrl: './portrait-add.component.html',
	styleUrls: ['./portrait-add.component.css']
})
export class PortraitAddComponent {
	private close: () => void;
	portrait: { name: string, file?: any} = { name: '' };

	constructor(private injector: Injector, private portraitActions: PortraitActions) {
		this.close = this.injector.get('close');
	}

	onSubmit(form) {
		try {
			// TODO: Validate.
			const file = form.value.file[0];
			if (!this.portrait.name || !file || !this.isImageType(file.type)) {
				// TODO: Notify for error!
				return;
			}

			this.portraitActions.addPortrait({ name: this.portrait.name, image: file });
			this.close();
		} catch (error) {
			console.log(error);
		}
	}

	private isImageType(type: string) {
		return type.startsWith('image');
	}
}
