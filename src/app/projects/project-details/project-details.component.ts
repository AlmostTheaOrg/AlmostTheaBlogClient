import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../auth/AuthenticationService';
import { ProjectService } from '../../data/services';
import { Project, Image } from '../../data/models';
import { ProjectPhotoListViewModel } from '../../data/view-models/ProjectPhotoListViewModel';
import { ModalCreator } from '../../shared/modal/modal-creator';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ProjectPhotoAddComponent } from '../project-photo-add/project-photo-add.component';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { ProjectDeleteComponent } from '../project-delete/project-delete.component';
import { ProjectPhotoRemoveComponent } from '../project-photo-remove/project-photo-remove.component';

@Component({
	selector: 'app-project-details',
	templateUrl: './project-details.component.html',
	styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent extends ModalCreator {
	@ViewChild(forwardRef(() => ModalComponent))
	private readonly child;
	private project: Project;
	public photos: Array<ProjectPhotoListViewModel> = [];

	public selected = { imageSrc: '', previous: null, next: null };

	constructor(private route: ActivatedRoute,
		private router: Router,
		private authService: AuthenticationService,
		private projectService: ProjectService) {
		super();
		this.route.params.subscribe(params => {
			const projectName = params['name'];
			this.project = this.projectService.find(p => p.getName() === projectName);
			if (this.project === null) {
				this.router.navigateByUrl('/projects');
				return;
			}

			this.photos = this.getPhotos();
		});
	}

	public getModalComponent() {
		return this.child;
	}

	get isLoggedIn() {
		return this.authService.isLogged;
	}

	addImage() {
		this.open(ProjectPhotoAddComponent, { project: this.project });
	}

	editProject() {
		this.open(ProjectEditComponent, { name: this.project.getName() });
	}

	deleteProject() {
		this.open(ProjectDeleteComponent, { project: this.project });
	}

	deletePhoto(event: Event, photo: { imageSrc: string }) {
		event.stopPropagation();

		this.open(ProjectPhotoRemoveComponent, { photo: photo, project: this.project });
	}

	select(photo) {
		this.selected = photo;
	}

	showPrevious() {
		if (this.selected.imageSrc === '') {
			return;
		}

		if (this.selected.previous) {
			this.selected = this.selected.previous;
		}
	}

	showNext() {
		if (this.selected.imageSrc === '') {
			return;
		}

		if (this.selected.next) {
			this.selected = this.selected.next;
		}
	}

	// Will return all images for a project (in their initial order).
	private getPhotos(): Array<ProjectPhotoListViewModel> {
		const photos = [];
		let previous: { imageSrc: string; } = null;

		for (const projectPhoto of this.project.getImages()) {
			const photoViewModel: ProjectPhotoListViewModel = { imageSrc: projectPhoto.getImageSrc() };
			if (previous !== null) {
				photoViewModel.previous = previous;
				photoViewModel.previous.next = photoViewModel;
			}

			photos.push(photoViewModel);
			previous = photoViewModel;
		}

		return photos;
	}
}
