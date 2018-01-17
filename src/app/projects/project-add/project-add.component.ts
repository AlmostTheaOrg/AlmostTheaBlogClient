import { Component, OnInit, Injector } from '@angular/core';
import { Project, Image } from '../../data/models';
import { ProjectService } from '../../data/services';
import { ModalWindow } from '../../shared/modal/modal-window';

@Component({
	selector: 'app-project-add',
	templateUrl: './project-add.component.html',
	styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent extends ModalWindow {
	public project = { name: '', thumb: '' };

	constructor(injector: Injector,
		private projectService: ProjectService) {
		super(injector);
	}

	onSubmit() {
		const project = new Project(this.project.name, new Image('thumb', this.project.thumb));
		this.projectService.add(project);
		this.close();
	}
}
