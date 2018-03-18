import { Component, OnInit, Injector } from '@angular/core';
import {  Image } from '../../data/models';
import { ModalWindow } from '../../modal/modal/modal-window';
import { ProjectActions } from '../project.actions';
import { AddProjectViewModel } from '../../services/project.service';
import { select } from 'ng2-redux';

@Component({
	selector: 'app-project-add',
	templateUrl: './project-add.component.html',
	styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent extends ModalWindow {
	public project: AddProjectViewModel = { name: '', thumbnail: null };
	public loading: boolean;

	constructor(injector: Injector,
		private projectActions: ProjectActions) {
		super(injector);
	}

	onSubmit(form: HTMLFormElement) {
		// TODO: validate
		try {
			this.project.thumbnail = form.value.file[0];
			this.projectActions.addProject(this.project);
			this.close();
		} catch (error) {
			console.log(error);
		}
	}
}
