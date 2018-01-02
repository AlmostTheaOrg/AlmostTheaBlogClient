import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home-module/home/home.component';
import { AboutComponent } from '../about-module/about/about.component';
import { ContactsComponent } from '../contacts-module/contacts/contacts.component';
import { PortraitsComponent } from '../portraits-module/portraits/portraits.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'portraits', component: PortraitsComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
