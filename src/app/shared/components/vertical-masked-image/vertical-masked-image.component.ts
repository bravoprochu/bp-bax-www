import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalViewerComponent } from '../../../otherModules/imageGallery/image-modal-viewer/image-modal-viewer.component';
import { ImageGalleryPayload } from '../../interfaces/image-gallery-payload';
import { CommonFunctionsService } from '../../services/common-functions.service';


@Component({
  selector: 'app-vertical-masked-image',
  templateUrl: './vertical-masked-image.component.html',
  styleUrls: ['./vertical-masked-image.component.css']
})
export class VerticalMaskedImageComponent implements OnInit {
  @Input('imageGalleryPayload') imageGalleryPayload: ImageGalleryPayload;
  @ViewChild('svgContainer', {static: true }) svgContainer: ElementRef;

  svgHeight: number = 250;
  imgUrl: string;
  imgWidth: number = 0;
  imgHeight: number = 1080;
  imgViewBox: string = "0 0 607 1080";
  intersection$: IntersectionObserver;
  
  isImgLoading: boolean;
  isImgReady: boolean;
  isIntersecting: boolean;
  
  textInfoBgColor: string;
  

  constructor(
    private matDialog: MatDialog,
    
  ) { }

  ngOnInit() {
    this.initIntersection();
  }

  initIntersection() {
    this.intersection$ = new IntersectionObserver(entries => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        this.isIntersecting = true;
        const ratio = entry.intersectionRatio;

        if (ratio > 0) {
          if (!this.isImgReady) {
              this.initImg()
          }
        }
        if (ratio >= 0.25 && ratio <= 0.5) {
        }
        if (ratio > 0.5 && ratio <= 0.75) {
        }
        if (ratio > 0.75 && ratio < 1) {
        }
        if (ratio == 1) {
        }
      })
    }, { threshold: [0, .25, .50, .75, 1] })

    this.intersection$.observe(this.svgContainer.nativeElement);
  }


  initImg() {
    this.imgUrl = this.imageGalleryPayload.imgUrl;
    
    const svgBound = (<SVGElement>this.svgContainer.nativeElement).getBoundingClientRect();
    const w = svgBound.width;
    const ratio = 16/9; 
    this.svgHeight = w * ratio;
    
    let img = new Image()
    img.src = this.imgUrl;
    this.isImgLoading = true;
    img.onerror = ()=>{
      this.isImgLoading = false;
      this.isImgReady = false;
    }
    img.onload = (ev)=> {
      const _el = (<HTMLImageElement>ev.srcElement);
      const orginalImgRatio = _el.naturalWidth/_el.naturalHeight;
      this.isImgLoading = false;
      this.isImgReady = true;

      this.imgHeight = _el.naturalHeight;
      this.imgWidth = _el.naturalWidth;


      this.imgHeight = 1920;
      this.imgWidth = this.imgHeight * orginalImgRatio;

      this.imgViewBox = `0 0 ${this.imgWidth} ${this.imgHeight}`;
    }
  }


  openModal(){
    const dialogRef = this.matDialog.open(ImageModalViewerComponent, {
      data: new ImageGalleryPayload(this.imageGalleryPayload.imageGalleryItemList, this.imageGalleryPayload.currentIndex)
      })

    dialogRef.afterClosed().subscribe(()=>{
    })
  }

}
