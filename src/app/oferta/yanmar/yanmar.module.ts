import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YanmarRoutingModule } from './yanmar-routing.module';
import { YanmarComponent } from './yanmar/yanmar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { YanmarMainComponent } from './yanmar-main/yanmar-main.component';
import { OfertaCommonModule } from '../oferta-common/oferta-common.module';
import { CardPersonService } from 'src/app/common/card-person/card-person.service';
import { CardPersonModule } from 'src/app/common/card-person/card-person.module';

@NgModule({
  declarations: [YanmarComponent, YanmarMainComponent],
  imports: [
    CommonModule,
    OfertaCommonModule,
    CardPersonModule,
    SharedModule,
    YanmarRoutingModule
  ],
  exports: [YanmarMainComponent]
})
export class YanmarModule { }
