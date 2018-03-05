import { Component, OnInit, Injector } from '@angular/core';
import { Project, Image } from '../../data/models';
import { ModalWindow } from '../../modal/modal/modal-window';
import { ProjectActions } from '../project.actions';

@Component({
	selector: 'app-project-add',
	templateUrl: './project-add.component.html',
	styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent extends ModalWindow {
	public project = { name: '', file: null };

	constructor(injector: Injector,
		private projectActions: ProjectActions) {
		super(injector);
	}

	onSubmit() {
		this.projectActions.addProject(this.project);
		this.close();
	}
}
