import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortraitsComponent } from './portraits/portraits.component';
import { SharedModule } from '../shared/shared.module';
import {
	PortraitAddComponent,
	PortraitDetailsComponent,
	PortraitEditComponent,
	PortraitDeleteComponent
} from './';

import { PortraitActions } from './portrait.actions';

@NgModule({
	imports: [CommonModule, FormsModule, SharedModule],
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
