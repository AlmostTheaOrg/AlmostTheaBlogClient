import { Component, OnInit, Injector } from '@angular/core';
import { ModalWindow } from '../../shared/modal/modal-window';
import { Project } from '../../data/models';
import { ProjectService } from '../../data/services/ProjectService';

@Component({
	selector: 'app-project-photo-remove',
	templateUrl: './project-photo-remove.component.html',
	styleUrls: ['./project-photo-remove.component.css']
})
export class ProjectPhotoRemoveComponent extends ModalWindow {
	private project: Project;
	private photo = { imageSrc: '' };
	constructor(injector: Injector, private projectService: ProjectService) {
		super(injector);

	}

	onSubmit() {
		const index = this.project.getImages().findIndex(p => p.getImageSrc() === this.photo.imageSrc);
		const images = this.project.getImages();
		images.splice(index, 1);
		this.project = new Project(this.project.getName(), this.project.getThumbnail(), images);

		this.projectService.edit(this.project.getId(), this.project);
	}
}
