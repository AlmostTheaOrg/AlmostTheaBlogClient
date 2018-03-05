import { Component, OnInit, Injector } from '@angular/core';
import { ModalWindow } from '../../modal/modal/modal-window';
import { Project } from '../../data/models';
import { ProjectActions } from '../project.actions';

@Component({
	selector: 'app-project-photo-remove',
	templateUrl: './project-photo-remove.component.html',
	styleUrls: ['./project-photo-remove.component.css']
})
export class ProjectPhotoRemoveComponent extends ModalWindow {
	private project: Project;
	private photo: { id: string, imageSource: string } = { id: '', imageSource: '' };

	constructor(injector: Injector, private projectActions: ProjectActions) {
		super(injector);
		this.photo = injector.get('photo');
		this.project = injector.get('project');
	}

	onSubmit() {
		this.projectActions.deleteProjectImage(this.project.getId(), this.photo.id);
		this.close();
	}
}
