import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICardPerson } from '../../interfaces/i-card-person';
import { BAX_BRANDS } from '../../enums/bax-brands.enum';

@Component({
  selector: 'app-card-person',
  templateUrl: './card-person.component.svg',
  styleUrls: ['./card-person.component.css']
})
export class CardPersonComponent implements OnInit {
  @Input("contactInfo") contact: ICardPerson

  constructor(
    private sanitizer: DomSanitizer
  ) { }


  gradientColor: string;
  gradientId: string;
  filterId: string;
  logoImgSrc: string;
  cardLogoImageBorder: string;



  filterUrl: string;

  ngOnInit() {
    this.gradientId = ('gradient_'+(Math.round(Math.random()*1000000)).toString()).trim();
    this.filterId = ('filter_'+(Math.round(Math.random()*1000000)).toString()).trim();
    // this.logoImgSrc = '../../../../assets/logotypy/1x1/logo_sennebogen_NN_1x1.png';
    
    //this.gradientColor = '#4DAA2B';

    this.cardLogoImageBorder = this.contact.markaLogoBorderInverse ? 'card-logo-image-border-inv': 'card-logo-image-border';

    this.initGradientColor();



    


    this.filterUrl = `url(#${this.filterId})`;

  }

  getUrlPath(elName: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${window.location.href}#${elName})`);
  }


  initGradientColor() {
    switch (this.contact.marka) {
      case BAX_BRANDS.BAX:
        this.gradientColor = '#0054A6';
        break;

      case BAX_BRANDS.Arjes:
        this.gradientColor = '#FF5E0E';
        break;     

      case BAX_BRANDS.Sennebogen:
        this.gradientColor = '#4DAA2B';
        break;

      case BAX_BRANDS.yanmar:
        this.gradientColor = '#E30020';
        break;       

      default:
        // this.gradientColor = '#E30020';
        this.gradientColor = '#fff';
        break;
    }
  }


}
