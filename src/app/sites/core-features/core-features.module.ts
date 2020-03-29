import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenuHorizontalComponent } from './home/menu-horizontal/menu-horizontal.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';




@NgModule({
  declarations: [
    MenuComponent,
    MenuHorizontalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
  ],
  exports: [
    MenuComponent,
    MenuHorizontalComponent,
]
})
export class CoreFeaturesModule { }
