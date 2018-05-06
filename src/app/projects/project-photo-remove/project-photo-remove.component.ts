import { Component, OnInit, Injector } from '@angular/core';
import { ModalWindow } from '../../modal/modal/modal-window';
import { ProjectActions } from '../project.actions';
import { Project } from '../../services/project.service';
import { SharedActions } from '../../shared/shared.actions';

@Component({
	selector: 'app-project-photo-remove',
	templateUrl: './project-photo-remove.component.html',
	styleUrls: ['./project-photo-remove.component.css']
})
export class ProjectPhotoRemoveComponent extends ModalWindow {
	public loading: boolean;

	private photo: { id: string, imageUrl: string } = { id: '', imageUrl: '' };
	private project: Project;

	constructor(injector: Injector,
		private projectActions: ProjectActions,
		private sharedActions: SharedActions) {
		super(injector);
		this.photo = injector.get('photo');
		this.project = injector.get('project');
	}

	onSubmit() {
		this.loading = true;
		this.projectActions.deletePhotoFromProject(this.project.id, this.photo.id)
			.then(() => {
				this.complete();
				this.sharedActions.showInfo('Photo was removed successfully!');
			})
			.catch(() => {
				this.complete();
				this.sharedActions.showDanger('Photo remove failed!');
			});
	}

	private complete() {
		this.close();
		this.loading = false;
	}
}
