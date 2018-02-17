import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../data/services';
import { Project, Image } from '../../data/models';
import { ProjectPhotoListViewModel } from '../../data/view-models/ProjectPhotoListViewModel';
import { ModalCreator } from '../../modal/modal/modal-creator';
import { ModalComponent } from '../../modal/modal/modal.component';
import { ProjectPhotoAddComponent } from '../project-photo-add/project-photo-add.component';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { ProjectDeleteComponent } from '../project-delete/project-delete.component';
import { ProjectPhotoRemoveComponent } from '../project-photo-remove/project-photo-remove.component';
import { ProjectActions } from '../project.actions';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { AuthActions } from '../../auth/auth.actions';

@Component({
	selector: 'app-project-details',
	templateUrl: './project-details.component.html',
	styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent extends ModalCreator implements OnInit {
	@ViewChild(forwardRef(() => ModalComponent))
	private readonly child;

	@select('selectedProject')
	private project: Observable<Project>;

	@select('isAuthenticated')
	public isAuthenticated;

	private current: Project;

	public photos: Array<ProjectPhotoListViewModel> = [];

	public selected: ProjectPhotoListViewModel = { imageSrc: '', previous: null, next: null };

	constructor(private route: ActivatedRoute,
		private router: Router,
		private authActions: AuthActions,
		private projectActions: ProjectActions) {
		super();

		this.route.params.subscribe(params => {
			const projectName = params['name'];
			this.projectActions.getProject(projectName);

			this.project.subscribe(p => {
				if (p === null) {
					this.router.navigateByUrl('/projects');
					return;
				}

				this.current = p;
				this.photos = this.getPhotos();
				if (this.photos.length > 0) {
					this.selected = this.photos[0];
				} else {
					this.selected = { imageSrc: '' };
				}
			});
		});
	}

	ngOnInit() {
		this.authActions.isAuthenticated();
	}

	public getModalComponent() {
		return this.child;
	}

	get isLoggedIn() {
		return this.isAuthenticated;
	}

	addImage() {
		this.open(ProjectPhotoAddComponent, { project: this.current });
	}

	editProject() {
		this.open(ProjectEditComponent, { name: this.current.getName() });
	}

	deleteProject() {
		this.open(ProjectDeleteComponent, { project: this.current });
	}

	deletePhoto(event: Event, photo: { imageSrc: string }) {
		event.stopPropagation();

		this.open(ProjectPhotoRemoveComponent, { photo: photo, project: this.current });
	}

	select(photo) {
		this.selected = photo;
	}

	showPrevious() {
		if (this.selected.imageSrc === '') {
			return;
		}

		if (this.hasPrevious()) {
			this.selected = this.selected.previous;
		}
	}

	showNext() {
		if (this.selected.imageSrc === '') {
			return;
		}

		if (this.hasNext()) {
			this.selected = this.selected.next;
		}
	}

	hasNext() {
		return !!this.selected.next;
	}

	hasPrevious() {
		return !!this.selected.previous;
	}
	// Will return all images for a project (in their initial order).
	private getPhotos(): Array<ProjectPhotoListViewModel> {
		const photos = [];
		let previous: { imageSrc: string; } = null;

		for (const projectPhoto of this.current.getImages()) {
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
