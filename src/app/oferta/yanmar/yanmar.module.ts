import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YanmarRoutingModule } from './yanmar-routing.module';
import { YanmarComponent } from './yanmar/yanmar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { YanmarMainComponent } from './yanmar-main/yanmar-main.component';
import { OfertaCommonModule } from '../oferta-common/oferta-common.module';
import { CardPersonModule } from 'src/app/common/card-person/card-person.module';
import { PreloadDirectivesModule } from 'src/app/shared/directives/preload-directives/preload-directives.module';

@NgModule({
  declarations: [YanmarComponent, YanmarMainComponent],
  imports: [
    CommonModule,
    PreloadDirectivesModule,
    OfertaCommonModule,
    CardPersonModule,
    SharedModule,
    YanmarRoutingModule
  ],
  exports: [YanmarMainComponent]
})
export class YanmarModule { }
