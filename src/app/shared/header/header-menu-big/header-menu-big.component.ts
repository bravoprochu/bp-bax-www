import { Component, OnInit } from '@angular/core';
import { bp_anim_svg_init } from 'src/app/animations/bp_anim_svg-init';

@Component({
  selector: '[app-header-menu-big]',
  templateUrl: './header-menu-big.component.html',
  styleUrls: ['./header-menu-big.component.css'],
  animations: [
    bp_anim_svg_init()
  ]
})
export class HeaderMenuBigComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
