import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuidettiRoutingModule } from './guidetti-routing.module';
import { GuidettiMainComponent } from './guidetti-main/guidetti-main.component';
import { CardPersonModule } from 'src/app/common/card-person/card-person.module';
import { OfertaCommonModule } from '../oferta-common/oferta-common.module';
import { SvgCommonModule } from 'src/app/shared/svg/svg-common.module';
import { BaxImgPreloaderDirective } from 'src/app/shared/directives/bax-img-preloader.directive';


@NgModule({
  declarations: [
    BaxImgPreloaderDirective,
    GuidettiMainComponent
  ],
  imports: [
    CommonModule,
    CardPersonModule,
    OfertaCommonModule,
    SvgCommonModule,
    GuidettiRoutingModule
  ],
  exports: [GuidettiMainComponent]
})
export class GuidettiModule { }
