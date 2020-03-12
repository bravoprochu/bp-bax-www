import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeStyle } from '@angular/platform-browser';
import { SvgCommonFunctionsService } from 'src/app/shared/svg/svg-common-functions.service';
import { svgLogoBaxSignOnly_white_Url } from 'src/app/shared/svg/classes/svg-bax-logo-url';
import { IOfertaItem } from '../../oferta/i-oferta-item';

@Component({
  selector: 'app-oferta-item',
  templateUrl: './oferta-item.component.svg',
  styleUrls: ['./oferta-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OfertaItemComponent implements OnInit {
  @Input('ofertaItem') oferta: IOfertaItem


  constructor(
    private sanitize: DomSanitizer,
    private el: ElementRef,
    private svgCF: SvgCommonFunctionsService,
  ) { }



  circlesHor: number[] = [...Array(9).keys()];
  circlesVert: number[] = [...Array(19).keys()];
  dotSpace: number = 50;
  


  idBlurFilter: string;
  idBlurFilterGet: string;
  idBrandGradient: string;
  idBrandGradientGet:string;
  idClipPathCircle: string;
  idClipPathCircleGet: string;

  logoBax: string;




  ngOnInit() {

    this.initSvgIds();
    this.logoBax = this.svgCF.getOriginUrl(svgLogoBaxSignOnly_white_Url())
    // initImage();
    // initIntersectionObserver();

  }


  initSvgIds(){
    this.idBlurFilter = this.svgCF.getUniqeId('blur');
    this.idBlurFilterGet = this.svgCF.getSvgDefsUrlPath(this.idBlurFilter);

    this.idBrandGradient = this.svgCF.getUniqeId('gradient');
    this.idBrandGradientGet = this.svgCF.getSvgDefsUrlPath(this.idBrandGradient);    

    this.idClipPathCircle = this.svgCF.getUniqeId('clipPath');
    this.idClipPathCircleGet = this.svgCF.getSvgDefsUrlPath(this.idClipPathCircle);
  }




}

