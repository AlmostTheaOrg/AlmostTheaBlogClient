import { Component, OnInit, ViewChild, forwardRef, OnDestroy } from '@angular/core';
import { ProjectAddComponent } from '../project-add/project-add.component';
import { ModalCreator } from '../../modal/modal/modal-creator';
import { ModalComponent } from '../../modal/modal/modal.component';
import { ProjectActions } from '../project.actions';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';
import { AuthActions } from '../../auth/auth.actions';
import { Project } from '../../services/project.service';
import { SharedActions } from '../../shared/shared.actions';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})
export class ProjectsComponent extends ModalCreator implements OnInit, OnDestroy {
	@select('projects')
	public projects: Observable<Project[]>;

	@select('isAuthenticated')
	public isAuthenticated;

	@ViewChild(forwardRef(() => ModalComponent))
	private readonly child;
	private subscription: Subscription;

	constructor(private authActions: AuthActions,
		private projectActions: ProjectActions,
		private sharedActions: SharedActions) {
		super();
	}

	ngOnInit() {
		this.projectActions.getProjects();
		this.sharedActions.showSpinner();
		this.subscription = this.projects.skip(1)
			.do(() => this.sharedActions.hideSpinner())
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
