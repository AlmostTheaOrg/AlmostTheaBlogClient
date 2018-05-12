import { Component, OnDestroy, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select } from 'ng2-redux';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthActions } from '../../auth/auth.actions';
import { DEFAULT_SELECTED_PROJECT } from '../../data/store/reducer';
import { ProjectPhotoListViewModel } from '../../data/view-models/ProjectPhotoListViewModel';
import { Project } from '../../services/project.service';
import { ModalCreator } from '../../shared/modal/modal-creator';
import { ModalComponent } from '../../shared/modal/modal.component';
import { SharedActions } from '../../shared/shared.actions';
import { ProjectDeleteComponent } from '../project-delete/project-delete.component';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { ProjectPhotoAddComponent } from '../project-photo-add/project-photo-add.component';
import { ProjectPhotoRemoveComponent } from '../project-photo-remove/project-photo-remove.component';
import { ProjectActions } from '../project.actions';

@Component({
	selector: 'app-project-details',
	templateUrl: './project-details.component.html',
	styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent extends ModalCreator implements OnInit, OnDestroy {
	@ViewChild(forwardRef(() => ModalComponent))
	private readonly child;

	@select('selectedProject')
	private project: Observable<Project>;

	@select('isAuthenticated')
	public isAuthenticated;

	public loading: boolean;
	public photos: Array<ProjectPhotoListViewModel> = [];
	public selected: ProjectPhotoListViewModel = { id: '', imageUrl: '', previous: null, next: null };

	private subscription: Subscription;
	private current: Project;
	constructor(private route: ActivatedRoute,
		private router: Router,
		private authActions: AuthActions,
		private sharedActions: SharedActions,
		private projectActions: ProjectActions) {
		super();

		this.route.params.subscribe(params => {
			const projectName = params['name'];
			this.projectActions.getProject(projectName);
		});

		this.project.subscribe(project => {
			if (!project) {
				router.navigateByUrl('404');
				return;
			}

			if (project !== DEFAULT_SELECTED_PROJECT) {
				this.current = project;
				this.photos = this.getPhotos();
				if (this.photos.length > 0) {
					this.selected = this.photos[0];
				} else {
					this.selected = { imageUrl: '', id: '' };
				}
			}
		});
	}

	ngOnInit() {
		this.authActions.isAuthenticated();
		this.loading = true;
		this.subscription = this.project
		.pipe(tap((data) => this.loading = !data))
			.subscribe();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
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
		this.open(ProjectEditComponent, this.current);
	}

	deleteProject() {
		this.open(ProjectDeleteComponent, { project: this.current });
	}

	deletePhoto(event: Event, photo: { imageUrl: string }) {
		event.stopPropagation();

		if (this.current.thumbnailUrl === photo.imageUrl) {
			this.sharedActions.showWarning('No, rebel! You can\'t delete the thumbnail for this project!');
			return;
		}

		this.open(ProjectPhotoRemoveComponent, { photo: photo, project: this.current });
	}

	select(photo) {
		this.selected = photo;
	}

	showPrevious() {
		if (this.selected.imageUrl === '') {
			return;
		}

		if (this.hasPrevious()) {
			this.selected = this.selected.previous;
		}
	}

	showNext() {
		if (this.selected.imageUrl === '') {
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
		let previous: { imageUrl: string; id: string } = null;

		for (const projectPhoto of this.current.photos) {
			const photoViewModel: ProjectPhotoListViewModel = { id: projectPhoto.id, imageUrl: projectPhoto.imageUrl };
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
