import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '../../../../shared/interfaces/i-menu-item';
import { MenuCommonFunctionsService } from '../../../../shared/services/menu-common-functions.service';

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
