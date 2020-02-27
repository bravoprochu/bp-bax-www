import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SerwisRoutingModule } from './serwis-routing.module';
import { SerwisMainComponent } from './serwis-main/serwis-main.component';
import { OfertaCommonModule } from '../oferta-common/oferta-common.module';
import { CardPersonModule } from 'src/app/common/card-person/card-person.module';

@NgModule({
  declarations: [
    SerwisMainComponent
  ],
  imports: [
    CommonModule,
    OfertaCommonModule,
    CardPersonModule,
    SerwisRoutingModule
  ],
  exports: [SerwisMainComponent]
})
export class SerwisModule { }
