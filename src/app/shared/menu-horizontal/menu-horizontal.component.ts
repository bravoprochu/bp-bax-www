import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '../interfaces/i-menu-item';
import { MenuCommonFunctionsService } from '../menu-common-functions.service';

@Component({
  selector: 'app-menu-horizontal',
  templateUrl: './menu-horizontal.component.html',
  styleUrls: ['./menu-horizontal.component.css']
})
export class MenuHorizontalComponent implements OnInit {

  constructor(private mService: MenuCommonFunctionsService) {
    
  }

 baxLogo:string = './assets/svg/logotypy/logo_bax_signOnly.svg';
 menu: IMenuItem[] = this.mService.menu;

 ngOnInit() {
 }

}
