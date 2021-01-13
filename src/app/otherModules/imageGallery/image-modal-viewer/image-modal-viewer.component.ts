import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageGalleryPayload } from '../../../shared/interfaces/image-gallery-payload';
import { CommonFunctionsService } from '../../../shared/services/common-functions.service';

@Component({
  selector: 'app-image-modal-viewer',
  templateUrl: './image-modal-viewer.component.html',
  styleUrls: ['./image-modal-viewer.component.css']
})
export class ImageModalViewerComponent implements OnInit {
@ViewChild('dialogContainer', {static: true }) dialogContainer: ElementRef;
imgUrl: string;
imgHeight: number;
imgWidth: number;
imgViewbox: string;


isImgLoading: boolean;
isImgReady: boolean;


modalWidth: number;
modalHeight: number;
svgHeight: number;
svgWidth: any;
svgViewbox: string;

windowWidth: number;
windowHeight: number;
windowIsHorizontal: boolean;


  constructor(
    private cf: CommonFunctionsService,
    private dialogRef: MatDialogRef<ImageModalViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public galleryPayload: ImageGalleryPayload
  ) { }

  ngOnInit() {
    window.onresize = (ev) => this.windowSizeChanged();
    this.initHammerjs();
    this.initImg();
  }


  initHammerjs(){
    const hammerManager = this.cf.initHammer(this.dialogContainer.nativeElement);
    hammerManager.on('swipe', (ev)=>{
      if(ev.direction == Hammer.DIRECTION_LEFT && this.galleryPayload.isNext) {
        // swipe left
        this.galleryPayload.next();
        this.initImg();
      }
      if(ev.direction == Hammer.DIRECTION_RIGHT && this.galleryPayload.isPrev) {
        // swipe right
        this.galleryPayload.prev();
        this.initImg();
      }
    });
  }

  

  windowSizeChanged(ratio: number = 1){

  }


  initImg(){
    const _containerBound = (<HTMLDivElement>this.dialogContainer.nativeElement).getBoundingClientRect();

    this.isImgLoading = true;
    this.isImgReady = false;
    let img = new Image();
    img.onload = (ev)=>{
      const _el = <HTMLImageElement>ev.srcElement;
      const _bound = _el.getBoundingClientRect();

      const _isHorizontal = _el.naturalWidth >= _el.naturalHeight;
      const _ratio = _el.naturalWidth/_el.naturalHeight;

      console.log('svgInitImg onLoad..', ev);
      console.log('isHorizontal',_isHorizontal, `w/h ${_el.naturalWidth}/${_el.naturalHeight} ratio: ${_ratio} || ${this.galleryPayload.imgUrl}` );

      this.windowSizeChanged(1);      

      

      if(_isHorizontal) {
        this.imgWidth = 1920;
        this.imgHeight = this.imgWidth * _ratio;
        this.svgViewbox = `0 0 1920 ${this.imgHeight}`;
        console.log(this.svgViewbox);
      } else {
        this.imgWidth = this.imgHeight/ _ratio;
        this.svgViewbox = `0 0 ${this.imgWidth} ${this.imgHeight}`;

      }

      this.isImgLoading = false;
      this.isImgReady = true;
    }
    img.src = this.galleryPayload.imgUrl;
  }

  goNext(){
    this.galleryPayload.next();
    this.initImg();
  }

  goPrev(){
    this.galleryPayload.prev();
    this.initImg();
  }


}
