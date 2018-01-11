import { Component, OnInit, Injector } from "@angular/core";
import { ImageRepository } from "../../data/ImageRepository";
import { Image } from "../../data/Image";

@Component({
  selector: "app-image-add",
  templateUrl: "./image-add.component.html",
  styleUrls: ["./image-add.component.css"]
})
export class ImageAddComponent {
  private close: () => void;

  public image: { name: string; image: string } = { name: "", image: '' };

  constructor(private injector: Injector, private repository: ImageRepository) {
    this.close = this.injector.get("close");
  }

  onSubmit() {
    // TODO: Validate.
    this.repository.add(new Image(this.image.name, this.image.image));
    this.close();
  }
}
