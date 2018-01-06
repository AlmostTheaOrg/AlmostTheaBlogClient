import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PortraitsComponent } from "./portraits/portraits.component";
import { AddPortraitComponent } from './add-portrait/add-portrait.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PortraitsComponent, AddPortraitComponent]
})
export class PortraitsModule {}
