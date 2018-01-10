import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
  Input
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ImageRepository } from "../../data/ImageRepository";
import { Image } from "../../data/Image";
@Component({
  selector: "app-category",
  templateUrl: "./category-details.component.html",
  styleUrls: ["./category-details.component.css"]
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  private category: string = "portraits";
  private routeChangeSubscription: any;

  private readonly empty = "";

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

  constructor(
    private route: ActivatedRoute,
    private repository: ImageRepository
  ) {
    this.repository.add(new Image("Biktor", "assets/images/portrait-1.jpg"));
    this.repository.add(new Image("Goshy", "assets/images/portrait-2.jpg"));
    this.repository.add(new Image("Elly", "assets/images/portrait-3.jpg"));
    this.repository.add(
      new Image("Doggie", "http://i.huffpost.com/gen/749263/original.jpg")
    );
  }

  ngOnInit() {
    this.routeChangeSubscription = this.route.params.subscribe(params => {
      this.category = params["category"];
    });
  }

  ngOnDestroy() {
    this.routeChangeSubscription.unsubscribe();
  }

  @Input()
  get class(): Object {
    return this.box;
  }

  get images(): Image[] {
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

  add() {
    this.box.class = this.opened;
    this.box.view = "add";
  }

  edit(event: Event, portrait: Image) {
    this.box.class = this.opened;
    this.box.portrait = { id: portrait.getId(), name: portrait.getName() };
    this.box.view = "edit";

    event.stopPropagation();
  }

  delete(event: Event, portrait: Image) {
    this.box.class = this.opened;
    this.box.portrait = { id: portrait.getId(), name: portrait.getName() };
    this.box.view = "delete";

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

  onDelete() {
    this.repository.delete(this.box.portrait.id);
    this.close();
  }
}