import { Component, OnInit, Injector } from "@angular/core";

@Component({
  selector: "app-image-details",
  templateUrl: "./image-details.component.html",
  styleUrls: ["./image-details.component.css"]
})
export class ImageDetailsComponent {
  private readonly imageSrc: string;

  constructor(private injector: Injector) {
    this.imageSrc = this.injector.get("imageSrc");
  }
}
