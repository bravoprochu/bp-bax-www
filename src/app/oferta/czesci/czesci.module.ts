import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CzesciRoutingModule } from './czesci-routing.module';
import { CzesciMainComponent } from './czesci-main/czesci-main.component';


@NgModule({
  declarations: [CzesciMainComponent],
  imports: [
    CommonModule,
    CzesciRoutingModule
  ],
  exports: [CzesciMainComponent]
})
export class CzesciModule { }
