import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		HeaderComponent,
		FooterComponent,
		ModalComponent,
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		ModalComponent
	]
})
export class SharedModule { }
