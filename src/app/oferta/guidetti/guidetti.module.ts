import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuidettiRoutingModule } from './guidetti-routing.module';
import { GuidettiMainComponent } from './guidetti-main/guidetti-main.component';
import { CardPersonModule } from 'src/app/common/card-person/card-person.module';
import { OfertaCommonModule } from '../oferta-common/oferta-common.module';
import { SvgCommonModule } from 'src/app/shared/svg/svg-common.module';
import { PreloadDirectivesModule } from 'src/app/shared/directives/preload-directives/preload-directives.module';



@NgModule({
  declarations: [
    GuidettiMainComponent
  ],
  imports: [
    CommonModule,
    PreloadDirectivesModule,
    CardPersonModule,
    OfertaCommonModule,
    SvgCommonModule,
    GuidettiRoutingModule
  ],
  exports: [
    GuidettiMainComponent
  ]
})
export class GuidettiModule { }
