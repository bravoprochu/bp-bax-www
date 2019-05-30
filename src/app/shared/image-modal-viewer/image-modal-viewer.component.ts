import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBaxModelMedia } from 'src/app/oferta/interfaces/i-bax-model-media';
import { IImageGalleryItem } from '../interfaces/i-image-gallery-item';
import { ImageGalleryPayload } from '../interfaces/image-gallery-payload';

@Component({
  selector: 'app-image-modal-viewer',
  templateUrl: './image-modal-viewer.component.html',
  styleUrls: ['./image-modal-viewer.component.css']
})
export class ImageModalViewerComponent implements OnInit {
@ViewChild('dialogContainer', { static: true }) dialogContainer: ElementRef;
imgUrl: string;
modalWidth: number;
modalHeight: number;

  constructor(
    private dialogRef: MatDialog,
      @Inject(MAT_DIALOG_DATA) public galleryPayload: ImageGalleryPayload
  ) { }

  ngOnInit() {
    this.initContainerProps();
    this.initImg();
    console.log(this.galleryPayload);
  }



  initContainerProps(){
    const _el = (<HTMLElement>this.dialogContainer.nativeElement).getBoundingClientRect();
    this.modalHeight = _el.height;
    this.modalWidth = _el.width;
  }

  initImg(){
    this.imgUrl = this.galleryPayload.imgUrl;
    console.log('modalInfo', this.modalWidth, this.modalHeight );
  }


}
