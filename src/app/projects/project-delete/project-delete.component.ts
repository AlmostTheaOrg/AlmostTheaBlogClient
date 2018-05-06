import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalWindow } from '../../modal/modal/modal-window';
import { ProjectActions } from '../project.actions';
import { Project } from '../../services/project.service';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';
import { Subscription } from 'rxjs/Subscription';
import { SharedActions } from '../../shared/shared.actions';

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
