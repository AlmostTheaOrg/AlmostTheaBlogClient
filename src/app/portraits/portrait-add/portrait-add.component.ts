import { Component, OnInit, Injector, ElementRef, ViewChild } from '@angular/core';
import { PortraitActions } from '../portrait.actions';
import { SharedActions } from '../../shared/shared.actions';

@Component({
	selector: 'app-portrait-add',
	templateUrl: './portrait-add.component.html',
	styleUrls: ['./portrait-add.component.css']
})
export class PortraitAddComponent {
	private close: () => void;
	portrait: { name: string, file?: any } = { name: '' };
	loading: boolean;

	constructor(private injector: Injector,
		private portraitActions: PortraitActions,
		private sharedActions: SharedActions) {
		this.close = this.injector.get('close');
	}

	onSubmit(form) {
		// TODO: Validate.
		const file = form.value.file[0];
		if (!this.portrait.name || !file || !this.isImageType(file.type)) {
			// TODO: Notify for error!
			return;
		}

		this.loading = true;
		this.portraitActions.addPortrait({ name: this.portrait.name, image: file })
			.then(p => {
				this.sharedActions.showInfo('Portrait was added successfully!');
				this.close();
				this.loading = false;
			})
			.catch((error: any) => {
				this.sharedActions.showWarning('Portrait add failed!');
				this.loading = false;
			});
	}

	private isImageType(type: string) {
		return type.startsWith('image');
	}
}
