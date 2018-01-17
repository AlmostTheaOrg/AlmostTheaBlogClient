import { Component, OnInit, Injector } from '@angular/core';
import { ModalWindow } from '../../shared/modal/modal-window';

@Component({
	selector: 'app-project-edit',
	templateUrl: './project-edit.component.html',
	styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent extends ModalWindow {
	private project = { name: '' };

	constructor(injector: Injector) {
		super(injector);
		this.project.name = injector.get('name');
	}

	onSubmit() {
		this.close();
	}
}
