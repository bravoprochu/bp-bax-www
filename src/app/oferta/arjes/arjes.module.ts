import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArjesRoutingModule } from './arjes-routing.module';
import { ArjesMainComponent } from './arjes-main/arjes-main.component';
import { OfertaCommonModule } from '../oferta-common/oferta-common.module';
import { CardPersonModule } from 'src/app/common/card-person/card-person.module';

@NgModule({
  declarations: [
    ArjesMainComponent
  ],
  imports: [
    CommonModule,
    OfertaCommonModule,
    CardPersonModule,
    ArjesRoutingModule
  ],
  exports: [ArjesMainComponent]
})
export class ArjesModule { }
