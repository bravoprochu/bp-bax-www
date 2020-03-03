import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SerwisRoutingModule } from './serwis-routing.module';
import { SerwisMainComponent } from './serwis-main/serwis-main.component';
import { OfertaCommonModule } from '../oferta-common/oferta-common.module';
import { CardPersonModule } from 'src/app/common/card-person/card-person.module';
import { PreloadDirectivesModule } from 'src/app/shared/directives/preload-directives/preload-directives.module';

@NgModule({
  declarations: [
    SerwisMainComponent
  ],
  imports: [
    CommonModule,
    PreloadDirectivesModule,
    OfertaCommonModule,
    CardPersonModule,
    SerwisRoutingModule
  ],
  exports: [SerwisMainComponent]
})
export class SerwisModule { }
