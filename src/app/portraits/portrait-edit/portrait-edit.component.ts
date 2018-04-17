import { Component, OnInit, Injector } from '@angular/core';
import { PortraitActions } from '../portrait.actions';
import { SharedActions } from '../../shared/shared.actions';

@Component({
	selector: 'app-portrait-edit',
	templateUrl: './portrait-edit.component.html',
	styleUrls: ['./portrait-edit.component.css']
})
export class PortraitEditComponent {
	portrait: { id: string; name: string; imageUrl: string, file?: any };
	loading: boolean;
	private close;

	constructor(private injector: Injector,
		private portraitActions: PortraitActions,
		private sharedActions: SharedActions) {
		this.portrait = {
			id: this.injector.get('id'),
			name: this.injector.get('name'),
			imageUrl: this.injector.get('imageUrl')
		};

		this.close = this.injector.get('close');
	}

	onSubmit(form) {
		const file = form.value.file ? form.value.file[0] : null;
		this.loading = true;
		this.portraitActions.editPortrait({ id: this.portrait.id, name: this.portrait.name, image: file })
			.then(p => {
				this.loading = false;
				this.sharedActions.showInfo('Portrait edited successfully!');
				this.close();
			})
			.catch(error => {
				this.loading = false;
				this.sharedActions.showWarning('Portrait edit failed!');
			});
	}
}
