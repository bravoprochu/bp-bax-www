import { Injectable } from '@angular/core';
import { IMenuItem } from './interfaces/i-menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuCommonFunctionsService {

  constructor() { }

  menu: IMenuItem[]=[
    {name: 'offer', routerLink: '/offer'},
    {name: 'special', routerLink: '/info'},
    {name: 'contact', routerLink: '/contact'},


  ]

}
