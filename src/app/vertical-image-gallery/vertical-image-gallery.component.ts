import { Component, OnInit, Input } from '@angular/core';
import { ImageGalleryPayload } from '../shared/interfaces/image-gallery-payload';
import { IImageGalleryItem } from '../shared/interfaces/i-image-gallery-item';

@Component({
  selector: 'app-vertical-image-gallery',
  templateUrl: './vertical-image-gallery.component.html',
  styleUrls: ['./vertical-image-gallery.component.css']
})
export class VerticalImageGalleryComponent implements OnInit {
  @Input('imageGalleryItemList') imageGalleryItemList: IImageGalleryItem[];
  galleryPayloadList: ImageGalleryPayload[] = [];

  constructor() { }

  ngOnInit() {
    let counter: number = 0;
    this.imageGalleryItemList.forEach(item => {
      this.galleryPayloadList.push(new ImageGalleryPayload(this.imageGalleryItemList, counter));
      counter ++;
    });
  }



}
