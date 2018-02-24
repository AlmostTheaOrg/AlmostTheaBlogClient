import { Component, OnInit, Injector, ElementRef, ViewChild } from '@angular/core';
import { Image } from '../../data/models';
import { PortraitActions } from '../portrait.actions';

@Component({
	selector: 'app-portrait-add',
	templateUrl: './portrait-add.component.html',
	styleUrls: ['./portrait-add.component.css']
})
export class PortraitAddComponent {
	private close: () => void;
	@ViewChild('fileInput') public fileInput: ElementRef;

	portrait: { name: string, file: any } = { name: '', file: null };

	constructor(private injector: Injector, private portraitActions: PortraitActions) {
		this.close = this.injector.get('close');
	}

	onSubmit() {
		// TODO: Validate.
		const file = <File>this.fileInput.nativeElement.files[0];
		if (!this.portrait.name || !file || !this.isImageType(file.type)) {
			// TODO: Notify for error!
			return;
		}

		// this.portraitActions.addPortrait({ name: this.image.name, file: portraitImage });
		this.close();
	}

	private isImageType(type: string) {
		return type.startsWith('image');
	}
}
