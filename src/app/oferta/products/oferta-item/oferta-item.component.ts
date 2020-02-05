import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-oferta-item',
  templateUrl: './oferta-item.component.html',
  styleUrls: ['./oferta-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OfertaItemComponent implements OnInit {
  @Input("mark") mark: string | 'bax';
  @Input("category") category: string | 'maszyny nowe';
  @Input("image") image: string;


  constructor(
    private sanitize: DomSanitizer,
    private el: ElementRef
  ) { }


  bgGradientClass: SafeStyle;
  containerMinHeight: number;
  gradientClass: string;
  imageSrc: SafeStyle;
  logoSrc:SafeResourceUrl;




  ngOnInit() {
    const _logoUrl = `assets/svg/logotypy/logo_${this.mark}.svg`;

    this.imageSrc = `assets/oferta/1x1/${this.image}`;


    this.gradientClass = `${this.mark}-gradient`

    this.bgGradientClass = this.sanitize.bypassSecurityTrustStyle(`${this.mark}-gradient`);

    this.logoSrc = this.sanitize.bypassSecurityTrustResourceUrl(_logoUrl);

  }

}

