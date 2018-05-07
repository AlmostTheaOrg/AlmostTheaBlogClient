import { NgModule } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
	declarations: [
		HomeComponent,
		AboutComponent,
		NotFoundComponent
	]
})
export class GeneralModule {

}
