import { Component, Injector } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable, Subscription } from 'rxjs';
import { Project } from '../../services/project.service';
import { ModalWindow } from '../../shared/modal/modal-window';
import { SharedActions } from '../../shared/shared.actions';
import { ProjectActions } from '../project.actions';

@Component({
	selector: 'app-project-photo-add',
	templateUrl: './project-photo-add.component.html',
	styleUrls: ['./project-photo-add.component.css']
})
export class ProjectPhotoAddComponent extends ModalWindow {
	public image = { files: null };
	public loading: boolean;
	private project: Project;

	@select('selectedProject')
	private selectedProject: Observable<Project>;
	private subscription: Subscription;

	constructor(injector: Injector,
		private projectActions: ProjectActions,
		private sharedActions: SharedActions) {
		super(injector);
		this.project = injector.get('project');
	}

	onSubmit() {
		this.loading = true;
		this.projectActions.addPhotoToProject(this.project.id, this.image.files[0])
			.then(() => {
				this.complete();
				this.sharedActions.showInfo('Photo was added successfully!');
			})
			.catch(() => {
				this.complete();
				this.sharedActions.showDanger('Photo add failed!');
			});
	}

	private complete() {
		this.close();
		this.loading = false;
	}
}
