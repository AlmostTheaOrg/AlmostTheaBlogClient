import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryDetailsComponent } from './category-details/category-details.component';
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
    CategoryDetailsComponent,
    ImageDetailsComponent,
    DynamicComponent,
    ImageEditComponent,
    ImageDeleteComponent,
    ImageAddComponent
  ]
})
export class CategoryModule {}
