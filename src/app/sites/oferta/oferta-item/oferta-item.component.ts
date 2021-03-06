import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { SvgCommonFunctionsService } from 'src/app/otherModules/svg/svg-common-functions.service';
import { svgLogoBaxSignOnly_white_Url } from 'src/app/otherModules/svg/classes/svg-bax-logo-url';
import { IOfertaItem } from '../oferta/i-oferta-item';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-oferta-item',
  templateUrl: './oferta-item.component.svg',
  styleUrls: ['./oferta-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OfertaItemComponent implements OnInit {
  @Input('ofertaItem') oferta: IOfertaItem;
  @Input('isSmall') isSmall: boolean


  constructor(
    private svgCF: SvgCommonFunctionsService  ) { }


  isDestroyed$: Subject<boolean> = new Subject()

  circlesHor: number[];
  circlesVert: number[];
  dotSpace: number = 50;
  


  idBlurFilter: string;
  idBlurFilterGet: string;
  idBrandGradient: string;
  idBrandGradientGet:string;
  idClipPathCircle: string;
  idClipPathCircleGet: string;

  
  isHorizontal: boolean;



  logoBax: string;

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
    this.isDestroyed$.unsubscribe();
}

  ngOnInit() {
    this.circlesHor = this.isSmall ? [...Array(27).keys()] : [...Array(9).keys()];
    this.circlesVert = this.isSmall ? [...Array(20).keys()] :  [...Array(19).keys()];
    
    
    this.initSvgIds();
    this.logoBax = this.svgCF.getOriginUrl(svgLogoBaxSignOnly_white_Url())
  }
  



  initSvgIds(){
    this.idBlurFilter = this.svgCF.getUniqeId('blur');
    this.idBlurFilterGet = this.svgCF.getSvgStyleUrlPathSuffix(this.idBlurFilter, 'filter');

    this.idBrandGradient = this.svgCF.getUniqeId('gradient');
    this.idBrandGradientGet = this.svgCF.getSvgStyleUrlPathSuffix(this.idBrandGradient, 'fill');    

    this.idClipPathCircle = this.svgCF.getUniqeId('clipPath');
    this.idClipPathCircleGet = this.svgCF.getSvgStyleUrlPathSuffix(this.idClipPathCircle, 'clip-path');
  }

}

