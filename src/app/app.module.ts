import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';
import { CategoryModule } from './category/category.module';
import { ProjectsModule } from './projects/projects.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ImageRepository } from './data/ImageRepository';
import { AuthenticationService } from './auth/AuthenticationService';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
	declarations: [AppComponent, NotFoundComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HomeModule,
		AboutModule,
		ContactsModule,
		ProjectsModule,
		SharedModule,
		CategoryModule,
		AuthModule
	],
	exports: [],
	providers: [ImageRepository, AuthenticationService],
	bootstrap: [AppComponent]
})
export class AppModule { }
