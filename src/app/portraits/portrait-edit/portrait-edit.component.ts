import { Component, OnInit, Injector } from '@angular/core';
import { PortraitActions } from '../portrait.actions';

@Component({
	selector: 'app-portrait-edit',
	templateUrl: './portrait-edit.component.html',
	styleUrls: ['./portrait-edit.component.css']
})
export class PortraitEditComponent {
	public portrait: { id: string; name: string; imageUrl: string, file?: any };
	private close;

	constructor(private injector: Injector, private portraitActions: PortraitActions) {
		this.portrait = {
			id: this.injector.get('id'),
			name: this.injector.get('name'),
			imageUrl: this.injector.get('imageUrl')
		};

		this.close = this.injector.get('close');
	}

	onSubmit(form) {
		try {
			const file = form.value.file ? form.value.file[0] : null;
			this.portraitActions.editPortrait({ id: this.portrait.id, name: this.portrait.name, image: file });
			this.close();
		} catch (error) {
			console.log(error);
		}
	}
}
