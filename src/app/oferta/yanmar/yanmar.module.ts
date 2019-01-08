import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YanmarRoutingModule } from './yanmar-routing.module';
import { YanmarComponent } from './yanmar/yanmar.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [YanmarComponent],
  imports: [
    CommonModule,
    SharedModule,
    YanmarRoutingModule
  ]
})
export class YanmarModule { }
