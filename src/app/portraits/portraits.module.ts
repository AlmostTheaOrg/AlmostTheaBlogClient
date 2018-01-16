import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortraitsComponent } from './portraits/portraits.component';
import { SharedModule } from '../shared/shared.module';
import { ModalComponent } from '../shared/modal/modal.component';
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
		ImageEditComponent,
		ImageDeleteComponent,
		ImageAddComponent
	]
})
export class PortraitsModule {}
