import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDeleteComponent } from './project-delete/project-delete.component';
import { ProjectPhotoAddComponent } from './project-photo-add/project-photo-add.component';
import { ProjectPhotoRemoveComponent } from './project-photo-remove/project-photo-remove.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		SharedModule
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
