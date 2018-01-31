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
	public project = { name: '', thumb: '' };

	constructor(injector: Injector,
		private projectActions: ProjectActions) {
		super(injector);
	}

	onSubmit() {
		const project = new Project(this.project.name, new Image('thumb', this.project.thumb));
		this.projectActions.addProject(project);
		this.close();
	}
}
