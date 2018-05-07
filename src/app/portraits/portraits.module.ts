import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PortraitAddComponent, PortraitDeleteComponent, PortraitDetailsComponent, PortraitEditComponent } from './';
import { PortraitActions } from './portrait.actions';
import { PortraitsComponent } from './portraits/portraits.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SharedModule
	],
	providers: [
		PortraitActions
	],
	declarations: [
		PortraitsComponent,
		PortraitDetailsComponent,
		PortraitEditComponent,
		PortraitDeleteComponent,
		PortraitAddComponent
	]
})
export class PortraitsModule { }
