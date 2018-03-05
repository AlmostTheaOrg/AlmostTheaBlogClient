import { Component, OnInit, Injector } from '@angular/core';
import { ModalWindow } from '../../modal/modal/modal-window';
import { Project } from '../../data/models/Project';
import { Image } from '../../data/models/Image';
import { ProjectActions } from '../project.actions';

@Component({
	selector: 'app-project-photo-add',
	templateUrl: './project-photo-add.component.html',
	styleUrls: ['./project-photo-add.component.css']
})
export class ProjectPhotoAddComponent extends ModalWindow {
	public image = { file: null };
	private project: Project;

	constructor(injector: Injector, private projectActions: ProjectActions) {
		super(injector);
		this.project = injector.get('project');
	}

	onSubmit() {
		this.projectActions.addProjectImage(this.project.getId(), this.image.file);
		this.close();
	}
}
