import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectDeleteComponent } from './project-delete/project-delete.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectPhotoAddComponent } from './project-photo-add/project-photo-add.component';
import { ProjectPhotoRemoveComponent } from './project-photo-remove/project-photo-remove.component';
import { ProjectActions } from './project.actions';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		SharedModule
	],
	providers: [
		ProjectActions
	],
	declarations: [
		ProjectsComponent,
		ProjectDetailsComponent,
		ProjectAddComponent,
		ProjectEditComponent,
		ProjectDeleteComponent,
		ProjectPhotoAddComponent,
		ProjectPhotoRemoveComponent
	]
})
export class ProjectsModule { }
