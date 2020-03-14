import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICardPerson } from '../../interfaces/i-card-person';
import { BAX_BRANDS } from '../../enums/bax-brands.enum';
import { SvgCommonFunctionsService } from 'src/app/shared/svg/svg-common-functions.service';

@Component({
  selector: 'app-card-person',
  templateUrl: './card-person.component.svg',
  styleUrls: ['./card-person.component.css']
})
export class CardPersonComponent implements OnInit {
  @Input("contactInfo") contact: ICardPerson

  constructor(
    private svgCF: SvgCommonFunctionsService,
    private sanitizer: DomSanitizer
  ) { }

  cardLogoImageBorder: string;
  filterId: string;
  gradientColor: string;
  
  idGradient: string;
  idGradientGet: string;
  
  logoImgSrc: string;
  mailto: string;



  filterUrl: string;

  ngOnInit() {
    this.idGradient = this.svgCF.getUniqeId('gradient');
    this.idGradientGet = this.svgCF.getSvgStyleUrlPathSuffix(this.idGradient, 'fill');
    

    this.cardLogoImageBorder = this.contact.markaLogoBorderInverse ? 'card-logo-image-border-inv': 'card-logo-image-border';

    this.initGradientColor();
    const marka = BAX_BRANDS[this.contact.marka];
    this.mailto = `mailto: ${this.contact.emails[0]}?subject=Jestem zainteresowany ofertą ${marka}&body=Dzień dobry ! Jestem zainteresowany ofertą ${marka}, proszę o szczegółowe dane dotyczące modelu....  lub kontakt telefoniczny pod numerem: `;



    


    this.filterUrl = `url(#${this.filterId})`;

  }

  getUrlPath(elName: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${window.location.href}#${elName})`);
  }


  initGradientColor() {
    switch (this.contact.marka) {
      case BAX_BRANDS.Arjes:
        this.gradientColor = '#FF5E0E';
        break;     

      case BAX_BRANDS.BAX:
        this.gradientColor = '#0054A6';
        break;        

      case BAX_BRANDS.Guidetti:
        this.gradientColor = '#006AB3';
        break;        

      case BAX_BRANDS.Sennebogen:
        this.gradientColor = '#4DAA2B';
        break;

      case BAX_BRANDS.Yanmar:
        this.gradientColor = '#E30020';
        break;       

      default:
        // this.gradientColor = '#E30020';
        this.gradientColor = '#fff';
        break;
    }
  }


}
