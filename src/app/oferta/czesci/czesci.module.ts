import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CzesciRoutingModule } from './czesci-routing.module';
import { CzesciMainComponent } from './czesci-main/czesci-main.component';
import { OfertaCommonModule } from '../oferta-common/oferta-common.module';
import { CardPersonModule } from 'src/app/common/card-person/card-person.module';


@NgModule({
  declarations: [CzesciMainComponent],
  imports: [
    CommonModule,
    OfertaCommonModule,
    CardPersonModule,
    CzesciRoutingModule
  ],
  exports: [CzesciMainComponent]
})
export class CzesciModule { }
