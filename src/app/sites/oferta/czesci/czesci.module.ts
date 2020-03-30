import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CzesciRoutingModule } from './czesci-routing.module';
import { CzesciMainComponent } from './czesci-main/czesci-main.component';
import { CardPersonModule } from 'src/app/otherModules/card-person/card-person.module';
import { PreloadDirectivesModule } from 'src/app/shared/directives/preload-directives/preload-directives.module';
import { OfertaCommonModule } from '../oferta-common/oferta-common.module';


@NgModule({
  declarations: [CzesciMainComponent],
  imports: [
    CommonModule,
    OfertaCommonModule,
    PreloadDirectivesModule,
    CardPersonModule,
    CzesciRoutingModule
  ],
  exports: [CzesciMainComponent]
})
export class CzesciModule { }
