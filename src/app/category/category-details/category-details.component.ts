import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageRepository } from '../../data/ImageRepository';
import { Image } from '../../data/Image';
import { ImageAddComponent, ImageDetailsComponent, ImageEditComponent, ImageDeleteComponent } from '../index';

import { DynamicComponent } from '../dynamic/dynamic.component';
@Component({
  selector: 'app-category',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  private category = 'portraits';
  private routeChangeSubscription: any;

  private readonly empty = '';

  private closed = 'lightbox-target';
  private opened = this.closed + ' selected';
  private focused = false;
  public componentData: Object;
  @ViewChild(DynamicComponent) private readonly child;

  public readonly box = {
    class: 'lightbox-target',
    imageSrc: this.empty,
    portrait: { id: '0', name: this.empty },
    view: this.empty
  };

  constructor(
    private route: ActivatedRoute,
    private repository: ImageRepository
  ) {
    this.repository.add(new Image('Biktor', 'assets/images/portrait-1.jpg'));
    this.repository.add(new Image('Goshy', 'assets/images/portrait-2.jpg'));
    this.repository.add(new Image('Elly', 'assets/images/portrait-3.jpg'));
    this.repository.add(
      new Image('Doggie', 'http://i.huffpost.com/gen/749263/original.jpg')
    );
  }

  ngOnInit() {
    this.routeChangeSubscription = this.route.params.subscribe(params => {
      this.category = params['category'];
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

  public open() {
    this.box.class = this.opened;
  }

  show(image: Image) {
    this.open();

    this.componentData = {
      component: ImageDetailsComponent,
      inputs: { imageSrc: image.getImageSrc() }
    };
  }

  public close() {
    this.box.class = this.closed;
    this.child.destroy();
  }

  add() {
    this.open();

    this.componentData = {
      component: ImageAddComponent,
      inputs: {
        close: this.close.bind(this)
      }
    };
  }

  edit(event: Event, image: Image) {
    this.open();
    event.stopPropagation();

    this.componentData = {
      component: ImageEditComponent,
      inputs: {
        id: image.getId(),
        name: image.getName(),
        imageSrc: image.getImageSrc(),
        close: this.close.bind(this)
      }
    };
  }

  delete(event: Event, image: Image) {
    this.open();
    event.stopPropagation();

    this.componentData = {
      component: ImageDeleteComponent,
      inputs: {
        id: image.getId(),
        name: image.getName(),
        close: this.close.bind(this)
      }
    };
  }
}
