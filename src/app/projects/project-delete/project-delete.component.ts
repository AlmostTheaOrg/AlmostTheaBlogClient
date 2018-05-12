import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';
import { Project } from '../../services/project.service';
import { ModalWindow } from '../../shared/modal/modal-window';
import { SharedActions } from '../../shared/shared.actions';
import { ProjectActions } from '../project.actions';

@Component({
	selector: 'app-project-delete',
	templateUrl: './project-delete.component.html',
})
export class ProjectDeleteComponent extends ModalWindow {
	public project: Project;
	public loading: boolean;

	@select('projects')
	private projects: Observable<Project[]>;

	constructor(injector: Injector,
		private projectActions: ProjectActions,
		private sharedActions: SharedActions,
		private router: Router) {
		super(injector);
		this.project = injector.get('project');
	}

	onSubmit() {
		this.loading = true;
		this.projectActions.deleteProject(this.project.id)
			.then(() => {
				this.complete();
				this.sharedActions.showInfo('Project was deleted successfully!');
			})

			.catch(() => {
				this.complete();
				this.sharedActions.showInfo('Project delete failed!');
			});
	}

	private complete() {
		this.loading = false;
		this.router.navigateByUrl('/projects');
		this.close();
	}
}
