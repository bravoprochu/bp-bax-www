import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CzesciRoutingModule } from './czesci-routing.module';
import { CzesciMainComponent } from './czesci-main/czesci-main.component';
import { OfertaCommonModule } from '../oferta-common/oferta-common.module';
import { CardPersonModule } from 'src/app/common/card-person/card-person.module';
import { PreloadDirectivesModule } from 'src/app/shared/directives/preload-directives/preload-directives.module';


@NgModule({
  declarations: [CzesciMainComponent],
  imports: [
    CommonModule,
    PreloadDirectivesModule,
    OfertaCommonModule,
    CardPersonModule,
    CzesciRoutingModule
  ],
  exports: [CzesciMainComponent]
})
export class CzesciModule { }
