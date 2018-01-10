import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home/home.component';
import { AboutComponent } from '../about/about/about.component';
import { ContactsComponent } from '../contacts/contacts/contacts.component';
import { PortraitsComponent } from '../portraits/portraits/portraits.component';
import { ProjectsComponent } from '../projects/projects/projects.component';
import { AddPortraitComponent } from '../portraits/add-portrait/add-portrait.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'portraits', component: PortraitsComponent},
  { path: 'portraits/add', component: AddPortraitComponent},
  { path: 'projects', component: ProjectsComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
