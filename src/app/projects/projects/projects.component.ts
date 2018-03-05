import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { Project } from '../../data/models/Project';
import { ProjectAddComponent } from '../project-add/project-add.component';
import { ModalCreator } from '../../modal/modal/modal-creator';
import { ModalComponent } from '../../modal/modal/modal.component';
import { ProjectActions } from '../project.actions';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';
import { AuthActions } from '../../auth/auth.actions';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})
export class ProjectsComponent extends ModalCreator implements OnInit {
	@select('projects')
	public projects: Observable<Project[]>;

	@select('isAuthenticated')
	public isAuthenticated;

	@ViewChild(forwardRef(() => ModalComponent))
	private readonly child;

	constructor(private authActions: AuthActions,
		private projectActions: ProjectActions) {
		super();
	}

	ngOnInit() {
		this.projectActions.getProjects();
		this.authActions.isAuthenticated();
	}

	addProject() {
		this.open(ProjectAddComponent, {});
	}

	public getModalComponent() {
		return this.child;
	}
}
