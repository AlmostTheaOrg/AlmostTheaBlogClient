import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortraitsComponent } from './portraits/portraits.component';
import { SharedModule } from '../shared/shared.module';
import { DynamicComponent } from './dynamic/dynamic.component';
import {
	ImageAddComponent,
	ImageDetailsComponent,
	ImageEditComponent,
	ImageDeleteComponent
} from './';

@NgModule({
	imports: [CommonModule, FormsModule, SharedModule],
	declarations: [
		PortraitsComponent,
		ImageDetailsComponent,
		DynamicComponent,
		ImageEditComponent,
		ImageDeleteComponent,
		ImageAddComponent
	]
})
export class PortraitsModule {}
