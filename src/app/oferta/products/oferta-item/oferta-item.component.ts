import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-oferta-item',
  templateUrl: './oferta-item.component.html',
  styleUrls: ['./oferta-item.component.css']
})
export class OfertaItemComponent implements OnInit {
  @Input("productId") productId: string;


  constructor(
    private sanitize: DomSanitizer
  ) { }


  logoSrc:SafeResourceUrl;
  logoSrcStr: string;

  ngOnInit() {
    console.log(this.productId);
    let _url = `assets/svg/logotypy/logo_${this.productId}.svg`;
    this.logoSrcStr = _url;

    this.logoSrc = this.sanitize.bypassSecurityTrustResourceUrl(_url);

  }

}
