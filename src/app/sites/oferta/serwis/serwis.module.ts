import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SerwisRoutingModule } from './serwis-routing.module';
import { SerwisMainComponent } from './serwis-main/serwis-main.component';
import { CardPersonModule } from 'src/app/common/card-person/card-person.module';
import { PreloadDirectivesModule } from 'src/app/shared/directives/preload-directives/preload-directives.module';
import { OfertaCommonModule } from '../oferta-common/oferta-common.module';

@NgModule({
  declarations: [
    SerwisMainComponent
  ],
  imports: [
    CommonModule,
    OfertaCommonModule,
    PreloadDirectivesModule,
    CardPersonModule,
    SerwisRoutingModule
  ],
  exports: [SerwisMainComponent]
})
export class SerwisModule { }
