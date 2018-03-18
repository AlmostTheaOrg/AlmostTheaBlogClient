import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalWindow } from '../../modal/modal/modal-window';
import { ProjectActions } from '../project.actions';
import { Project } from '../../services/project.service';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-project-delete',
	templateUrl: './project-delete.component.html',
})
export class ProjectDeleteComponent extends ModalWindow implements OnInit, OnDestroy {
	public project: Project;

	@select('projects')
	private projects: Observable<Project[]>;
	private subscription: Subscription;
	private hasBeenSubmitted = false;

	constructor(injector: Injector,
		private projectActions: ProjectActions,
		private router: Router) {
		super(injector);
		this.project = injector.get('project');
	}

	ngOnInit(): void {
		this.subscription = this.projects.subscribe(projects => {
			if (this.hasBeenSubmitted && projects.findIndex(pr => pr.id === this.project.id) < 0) {
				this.router.navigateByUrl('/projects');
				this.close();
			}
		});
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.projectActions.deleteProject(this.project.id);
		this.hasBeenSubmitted = true;
	}
}
