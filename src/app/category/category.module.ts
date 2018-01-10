import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CategoryDetailsComponent } from "./category-details/category-details.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule],
  declarations: [CategoryDetailsComponent]
})
export class CategoryModule {}