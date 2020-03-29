import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArjesRoutingModule } from './arjes-routing.module';
import { ArjesMainComponent } from './arjes-main/arjes-main.component';
import { CardPersonModule } from 'src/app/common/card-person/card-person.module';
import { PreloadDirectivesModule } from 'src/app/shared/directives/preload-directives/preload-directives.module';
import { OfertaCommonModule } from '../oferta-common/oferta-common.module';

@NgModule({
  declarations: [
    ArjesMainComponent
  ],
  imports: [
    CommonModule,
    OfertaCommonModule,
    PreloadDirectivesModule,
    CardPersonModule,
    ArjesRoutingModule
  ],
  exports: [ArjesMainComponent]
})
export class ArjesModule { }
