import { Component, OnDestroy, OnInit, ViewChild, forwardRef } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthActions } from '../../auth/auth.actions';
import { Project } from '../../services/project.service';
import { ModalCreator } from '../../shared/modal/modal-creator';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ProjectAddComponent } from '../project-add/project-add.component';
import { ProjectActions } from '../project.actions';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})
export class ProjectsComponent extends ModalCreator implements OnInit, OnDestroy {
	public loading: boolean;

	@select('projects')
	public projects: Observable<Project[]>;

	@select('isAuthenticated')
	public isAuthenticated;

	@ViewChild(forwardRef(() => ModalComponent))
	private readonly child;
	private subscription: Subscription;


	constructor(private authActions: AuthActions,
		private projectActions: ProjectActions) {
		super();
	}

	ngOnInit() {
		this.projectActions.getProjects();
		this.loading = true;
		this.subscription = this.projects
			.pipe(tap((data) => this.loading = !data))
			.subscribe();
		this.authActions.isAuthenticated();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	addProject() {
		this.open(ProjectAddComponent, {});
	}

	public getModalComponent() {
		return this.child;
	}
}
