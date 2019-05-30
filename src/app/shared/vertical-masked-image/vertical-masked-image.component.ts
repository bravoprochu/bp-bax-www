import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ImageModalViewerComponent } from '../image-modal-viewer/image-modal-viewer.component';
import { SvgCommonFunctionsService } from '../svg/svg-common-functions.service';
import { ImageGalleryPayload } from '../interfaces/image-gallery-payload';


@Component({
  selector: 'app-vertical-masked-image',
  templateUrl: './vertical-masked-image.component.html',
  styleUrls: ['./vertical-masked-image.component.css']
})
export class VerticalMaskedImageComponent implements OnInit {
  @Input('imageGalleryPayload') imageGalleryPayload: ImageGalleryPayload;
  @ViewChild('svgContainer', { static: true }) svgContainer: ElementRef;

  svgHeight: number = 250;
  imgUrl: string;
  imgWidth: number = 0;
  imgHeight: number = 1080;
  imgViewBox: string = "0 0 607 1080";
  textInfoBgColor: string;
  

  constructor(
    private matDialog: MatDialog,
    private svgSrv: SvgCommonFunctionsService
  ) { }

  ngOnInit() {
    console.log('vert maskte init', );
    // this.textInfoBgColor = this.imageGalleryPayload.modelBackground || environment.colorBax;
    this.initImg();
  }


  initImg() {
    this.imgUrl = this.imageGalleryPayload.imgUrl;
    
    const svgBound = (<SVGElement>this.svgContainer.nativeElement).getBoundingClientRect();
    const w = svgBound.width;
    const ratio = 16/9; 
    this.svgHeight = w * ratio;
    
    let img = new Image()
    img.src = this.imgUrl;
    img.onload = (ev)=> {
      const _el = (<HTMLImageElement>ev.srcElement);
      const orginalImgRatio = _el.naturalWidth/_el.naturalHeight;
      const _width = this.svgHeight * orginalImgRatio;
      const imgIsHorizontal: boolean = _el.naturalHeight <= _el.naturalWidth;


      //
      //  
      //
      // this.imgWidth = 1080 * orginalImgRatio;




      
      
      
      // this.imgHeight = _width * ratio;
      // this.imgWidth = this.imgHeight / orginalImgRatio;

      this.imgHeight = _el.naturalHeight;
      this.imgWidth = _el.naturalWidth;


      this.imgHeight = 1920;
      this.imgWidth = this.imgHeight * orginalImgRatio;

      this.imgViewBox = `0 0 ${this.imgWidth} ${this.imgHeight}`;
    }


  }


  openModal(){
    const dialogRef = this.matDialog.open(ImageModalViewerComponent, {
      width: '95vw',
      height: '95vh',
      data: this.imageGalleryPayload,
      })

    dialogRef.afterClosed().subscribe(res=>{
      console.log('img closed...');
    })
  }

}
