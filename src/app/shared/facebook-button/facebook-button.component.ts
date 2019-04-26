import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-facebook-button',
  templateUrl: './facebook-button.component.html',
  styleUrls: ['./facebook-button.component.css']
})
export class FacebookButtonComponent implements OnInit {
  @Input("linkToShare") linkToShare: string;
  fbUrl: any;
  twitterUrl: any;
  mailUrl: any;
  whatsupUrl: any;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.fbUrl = this.sanitizer.bypassSecurityTrustUrl(`https://facebook.com/sharer/sharer.php?u=${environment.dns}${this.linkToShare}`);
    this.twitterUrl = this.sanitizer.bypassSecurityTrustUrl(`https://twitter.com/intent/tweet/?text=Polecam ten link link:&amp;url=${environment.dns}${this.linkToShare}`);
    this.mailUrl = this.sanitizer.bypassSecurityTrustUrl(`mailto:?subject=Polecam ten link:&body=${environment.dns}${this.linkToShare}`);
    this.whatsupUrl = this.sanitizer.bypassSecurityTrustUrl(`whatsapp://send?text=Polecam ten link: ${environment.dns}${this.linkToShare}`);
  }

}
