import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YanmarRoutingModule } from './yanmar-routing.module';
import { YanmarComponent } from './yanmar/yanmar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { YanmarMainComponent } from './yanmar-main/yanmar-main.component';

@NgModule({
  declarations: [YanmarComponent, YanmarMainComponent],
  imports: [
    CommonModule,
    SharedModule,
    YanmarRoutingModule
  ],
  exports: [YanmarMainComponent]
})
export class YanmarModule { }
