import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-portraits",
  templateUrl: "./portraits.component.html",
  styleUrls: ["./portraits.component.css"]
})
export class PortraitsComponent implements OnInit {
  @Output() private classChange = new EventEmitter();
  private nonSelected = "lightbox-target";
  private selected = this.nonSelected + " selected";

  private image = { class: "lightbox-target", imageSrc: "" };

  private focused = false;

  private portraits = [
    { imgSrc: "assets/images/portrait-1.jpg", name: "Biktor" },
    { imgSrc: "assets/images/portrait-2.jpg", name: "Goshy" },
    { imgSrc: "assets/images/portrait-3.jpg", name: "Elly" },
    { imgSrc: "assets/images/portrait-1.jpg", name: "Biktor" },
    { imgSrc: "assets/images/portrait-1.jpg", name: "Biktor" },
    { imgSrc: "assets/images/portrait-1.jpg", name: "Biktor" },
    { imgSrc: "http://i.huffpost.com/gen/749263/original.jpg", name: "Doggie" }
  ];

  ngOnInit() {}

  @Input()
  get class(): Object {
    return this.image;
  }

  enlarge(portrait) {
    this.image.class = this.selected;
    this.image.imageSrc = portrait.imgSrc;

    this.classChange.emit(this.image);
  }

  close() {
    this.image.class = this.nonSelected;
    this.image.imageSrc = "";

    console.log('close')
    this.classChange.emit(this.image);
  }
}
