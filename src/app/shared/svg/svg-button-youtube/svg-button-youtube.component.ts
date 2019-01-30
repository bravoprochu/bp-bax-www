import { Component, OnInit, Input } from '@angular/core';
import { BP_ANIM_SVG_INIT } from 'src/app/animations/bp_anim_svg-init';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: '[svg-button-youtube]',
  templateUrl: './svg-button-youtube.component.html',
  styleUrls: ['./svg-button-youtube.component.css'],
  animations: [
    BP_ANIM_SVG_INIT(200, 100, 'g', 1000)
  ]
})
export class SvgButtonYoutubeComponent implements OnInit {
  @Input('x') x: string = "0";
  @Input('y') y: string = "0";
  @Input('height') height: string = "100";
  @Input('width') width: string = "100";
  @Input('title') title: string = "BRAK TYTUŁU";
  @Input('url') url: any = "http://google.com";

  constructor(
  ) { }

  ngOnInit() {
    
  }

  goto(){
    window.open(this.url, '_blank');
  }

}
