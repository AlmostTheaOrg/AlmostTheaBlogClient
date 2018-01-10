import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PortraitsComponent } from "./portraits/portraits.component";
import { AddPortraitComponent } from "./add-portrait/add-portrait.component";

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [PortraitsComponent, AddPortraitComponent]
})
export class PortraitsModule {}
