import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ImageRepository } from "../../data/ImageRepository";
import { Image } from "../../data/Image";

@Component({
  selector: "app-portraits",
  templateUrl: "./portraits.component.html",
  styleUrls: ["./portraits.component.css"]
})
export class PortraitsComponent implements OnInit {
  private readonly empty = "";
  private readonly full = "Zdr";

  @Output() private classChange = new EventEmitter();
  private closed = "lightbox-target";
  private opened = this.closed + " selected";
  private focused = false;

  public box = {
    class: "lightbox-target",
    imageSrc: this.empty,
    portrait: { id: "0", name: this.empty },
    view: this.empty
  };

  constructor(private repository: ImageRepository) {
    this.repository.add(new Image("Biktor", "assets/images/portrait-1.jpg"));
    this.repository.add(new Image("Goshy", "assets/images/portrait-2.jpg"));
    this.repository.add(new Image("Elly", "assets/images/portrait-3.jpg"));
    this.repository.add(
      new Image("Doggie", "http://i.huffpost.com/gen/749263/original.jpg")
    );
  }

  ngOnInit() {}

  @Input()
  get class(): Object {
    return this.box;
  }

  get portraits(): Image[] {
    return this.repository.all();
  }

  open(portrait: Image) {
    this.box.class = this.opened;
    this.box.imageSrc = portrait.getImageSrc();
    this.box.view = "image";

    this.classChange.emit(this.box);
  }

  close() {
    this.box.class = this.closed;
    this.box.imageSrc = this.empty;
    this.box.view = this.empty;

    this.classChange.emit(this.box);
  }

  edit(event: Event, portrait: Image) {
    this.box.class = this.opened;
    this.box.portrait = { id: portrait.getId(), name: portrait.getName() };
    this.box.view = "edit";

    event.stopPropagation();
  }

  delete(event: Event, portrait: Image) {
    if (confirm("Do you really want to delete this photo?")) {
      this.repository.delete(portrait.getId());
    }

    event.stopPropagation();
  }

  onSubmit() {
    let original = this.repository.get(this.box.portrait.id);
    let copy = this.box.portrait;
    let name = original.getName();
    let imageSrc = original.getImageSrc();

    if (copy.name !== original.getName()) {
      name = copy.name;
    }

    this.repository.edit(copy.id, new Image(name, imageSrc));
    this.close();
  }
}
