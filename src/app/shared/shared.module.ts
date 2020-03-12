import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SocialButtonsComponent } from './social-buttons/social-buttons.component'
import { CommonFunctionsService } from './common-functions.service';
import { HeaderComponent } from './header/header/header.component';
import { HeaderMenuBigComponent } from './header/header-menu-big/header-menu-big.component';
import { PantoneToHexModule } from '../pantoneToHex/pantone-to-hex.module';
import { MenuComponent } from './menu/menu.component';
import { MenuHorizontalComponent } from './menu-horizontal/menu-horizontal.component';
import { MenuCommonFunctionsService } from './menu-common-functions.service';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  entryComponents: [
  ],
  declarations: [
    SocialButtonsComponent,
    HeaderComponent,
    HeaderMenuBigComponent,
    MenuComponent,
    MenuHorizontalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ScrollingModule,
  ],
  exports: [
    CommonModule,
    SocialButtonsComponent,
    FlexLayoutModule,
    HeaderComponent,
    HeaderMenuBigComponent,
    MenuComponent,
    RouterModule,
    MenuHorizontalComponent,
    ScrollingModule,
  ],
  providers: [
    CommonFunctionsService,
    MenuCommonFunctionsService
  ]
})
export class SharedModule { }
