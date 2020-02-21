import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuidettiRoutingModule } from './guidetti-routing.module';
import { GuidettiMainComponent } from './guidetti-main/guidetti-main.component';
import { CardPersonModule } from 'src/app/common/card-person/card-person.module';
import { OfertaCommonModule } from '../oferta-common/oferta-common.module';


@NgModule({
  declarations: [GuidettiMainComponent],
  imports: [
    CommonModule,
    CardPersonModule,
    OfertaCommonModule,
    GuidettiRoutingModule
  ],
  exports: [GuidettiMainComponent]
})
export class GuidettiModule { }
