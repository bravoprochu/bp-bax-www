import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMenuBigComponent } from '../shared/header/header-menu-big/header-menu-big.component';
import { MenuComponent } from '../shared/menu/menu.component';
import { MenuHorizontalComponent } from '../shared/menu-horizontal/menu-horizontal.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    HeaderMenuBigComponent,
    MenuComponent,
    MenuHorizontalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
  ],
  exports: [
    HeaderMenuBigComponent,
    MenuComponent,
    MenuHorizontalComponent,
]
})
export class CoreFeaturesModule { }
