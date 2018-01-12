import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home/home.component';
import { AboutComponent } from '../about/about/about.component';
import { ContactsComponent } from '../contacts/contacts/contacts.component';
import { CategoryDetailsComponent } from '../category/category-details/category-details.component';
import { ProjectsComponent } from '../projects/projects/projects.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { LoginComponent } from '../auth/login/login.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'contacts', component: ContactsComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'category/:category', component: CategoryDetailsComponent },
	{ path: 'portraits', component: CategoryDetailsComponent },
	{ path: 'projects', component: ProjectsComponent },
	{ path: '404', component: NotFoundComponent },
	{ path: '**', redirectTo: '/404' }
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
