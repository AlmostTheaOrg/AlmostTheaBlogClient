import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../about/about/about.component';
import { LoginComponent } from '../auth/login/login.component';
import { ContactsComponent } from '../contacts/contacts/contacts.component';
import { FeedbackComponent } from '../contacts/feedback/feedback.component';
import { HomeComponent } from '../home/home/home.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { PortraitsComponent } from '../portraits/portraits/portraits.component';
import { ProjectDetailsComponent } from '../projects/project-details/project-details.component';
import { ProjectsComponent } from '../projects/projects/projects.component';
import { AuthenticationGuardService } from '../services/authentication.guard.service';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'contacts', component: ContactsComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'portraits', component: PortraitsComponent },
	{ path: 'projects', component: ProjectsComponent },
	{ path: 'projects/:name', component: ProjectDetailsComponent },
	{ path: 'feedback', component: FeedbackComponent, canActivate: [AuthenticationGuardService] },
	{ path: '404', component: NotFoundComponent },
	{ path: '**', redirectTo: '/404' }
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
