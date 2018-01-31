import { Component, OnInit, Injector } from '@angular/core';
import { ModalWindow } from '../../modal/modal/modal-window';
import { ProjectActions } from '../project.actions';
import { Project } from '../../data/models/Project';
import { Image } from '../../data/models/Image';

@Component({
	selector: 'app-project-edit',
	templateUrl: './project-edit.component.html',
	styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent extends ModalWindow {
	public project = { name: '', thumb: '' };

	constructor(injector: Injector,
		private projectActions: ProjectActions) {
		super(injector);
		this.project.name = injector.get('name');
	}

	onSubmit() {
		this.close();
	}
}
