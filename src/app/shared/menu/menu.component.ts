import { Component, OnInit } from '@angular/core';
import { MenuCommonFunctionsService } from '../menu-common-functions.service';
import { IMenuItem } from '../interfaces/i-menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private mService: MenuCommonFunctionsService) {
    
   }

  baxLogo:string = './assets/svg/logotypy/logo_bax_signOnly.svg';
  menu: IMenuItem[] = this.mService.menu;

  ngOnInit() {
  }

}
