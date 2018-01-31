import { Component, OnInit, Injector } from '@angular/core';
import { ModalWindow } from '../../modal/modal/modal-window';
import { ProjectService } from '../../data/services/ProjectService';
import { Project } from '../../data/models/Project';
import { Image } from '../../data/models/Image';
import { ProjectActions } from '../project.actions';

@Component({
	selector: 'app-project-photo-add',
	templateUrl: './project-photo-add.component.html',
	styleUrls: ['./project-photo-add.component.css']
})
export class ProjectPhotoAddComponent extends ModalWindow {
	public image = { image: '' };
	private project: Project;

	constructor(injector: Injector, private projectActions: ProjectActions) {
		super(injector);
		this.project = injector.get('project');
	}

	onSubmit() {
		const photos = this.project.getImages();
		photos.push(new Image('', this.image.image));
		const newProject = new Project(this.project.getName(), this.project.getThumbnail(), photos);
		this.projectActions.editProject(this.project.getId(), newProject);
		this.close();

	}
}
