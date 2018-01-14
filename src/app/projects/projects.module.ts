import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
	],
	declarations: [ProjectsComponent, ProjectDetailsComponent]
})
export class ProjectsModule { }
