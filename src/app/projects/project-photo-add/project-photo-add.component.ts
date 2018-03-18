import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { ModalWindow } from '../../modal/modal/modal-window';
import { ProjectActions } from '../project.actions';
import { Project } from '../../services/project.service';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-project-photo-add',
	templateUrl: './project-photo-add.component.html',
	styleUrls: ['./project-photo-add.component.css']
})
export class ProjectPhotoAddComponent extends ModalWindow implements OnInit, OnDestroy {
	public image = { files: null };
	private project: Project;

	@select('selectedProject')
	private selectedProject: Observable<Project>;
	private subscription: Subscription;

	constructor(injector: Injector, private projectActions: ProjectActions) {
		super(injector);
		this.project = injector.get('project');
	}

	onSubmit() {
		this.projectActions.addPhotoToProject(this.project.id, this.image.files[0]);
	}

	ngOnInit() {
		this.subscription = this.selectedProject.subscribe((selectedProject) => {
			if (selectedProject && this.project.photos.length < selectedProject.photos.length) {
				this.close();
			}
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
