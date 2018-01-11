import { Component, OnInit, Injector } from '@angular/core';
import { ImageRepository } from '../../data/ImageRepository';
import { Image } from '../../data/Image';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css']
})
export class ImageEditComponent {
  public image: { id: string; name: string; image: string };
  private close;

  constructor(private injector: Injector, private repository: ImageRepository) {
    this.image = {
      id: this.injector.get('id'),
      name: this.injector.get('name'),
      image: this.injector.get('imageSrc')
    };

    this.close = this.injector.get('close');
  }

  onSubmit() {
    this.repository.edit(
      this.image.id,
      new Image(this.image.name, this.image.image)
    );

    this.close();
  }
}
