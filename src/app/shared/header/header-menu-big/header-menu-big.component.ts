import { Component, OnInit } from '@angular/core';
import { BP_ANIM_SVG_INIT } from 'src/app/animations/bp_anim_svg-init';

@Component({
  selector: '[app-header-menu-big]',
  templateUrl: './header-menu-big.component.html',
  styleUrls: ['./header-menu-big.component.css'],
  animations: [
    BP_ANIM_SVG_INIT()
  ]
})
export class HeaderMenuBigComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
