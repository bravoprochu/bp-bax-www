import { Component, OnInit, Input } from '@angular/core';
import { ImageGalleryPayload } from '../shared/interfaces/image-gallery-payload';
import { IImageGallery } from '../shared/interfaces/i-image-gallery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vertical-image-gallery',
  templateUrl: './vertical-image-gallery.component.html',
  styleUrls: ['./vertical-image-gallery.component.css']
})
export class VerticalImageGalleryComponent implements OnInit {
  @Input('imageGallery') imageGallery: IImageGallery;
  galleryPayloadList: ImageGalleryPayload[] = [];

  constructor() { }

  ngOnInit() {
    let counter: number = 0;
    this.imageGallery.infoBgColor = this.imageGallery.infoBgColor ? this.imageGallery.infoBgColor : environment.colorBax;
    this.imageGallery.imageGalleryItemList.forEach(item => {
      item.infoBgColor = item.infoBgColor ? item.infoBgColor : this.imageGallery.infoBgColor;
      item.title = item.title ? item.title : this.imageGallery.galleryName;
      this.galleryPayloadList.push(new ImageGalleryPayload(this.imageGallery.imageGalleryItemList, counter));
      counter ++;
    });
  }



}
