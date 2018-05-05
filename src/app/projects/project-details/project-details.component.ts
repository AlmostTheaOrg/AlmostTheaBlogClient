import { Component, OnInit, ViewChild, forwardRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Project } from '../../services/project.service';
import { DEFAULT_SELECTED_PROJECT } from '../../store/reducer';
import { Subscription } from 'rxjs/Subscription';
import { SharedActions } from '../../shared/shared.actions';

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
			.do((data) => this.loading = !data)
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
		this.open(ProjectEditComponent, { id: this.current.id, name: this.current.name });
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
