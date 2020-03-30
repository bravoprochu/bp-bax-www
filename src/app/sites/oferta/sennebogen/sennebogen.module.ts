import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SennebogenRoutingModule } from './sennebogen-routing.module';
import { SennebogenMainComponent } from './sennebogen-main/sennebogen-main.component';
import { CardPersonModule } from 'src/app/otherModules/card-person/card-person.module';
import { PreloadDirectivesModule } from 'src/app/shared/directives/preload-directives/preload-directives.module';
import { MaszynyNoweModule } from '../maszynyNowe/maszyny-nowe.module';
import { OfertaCommonModule } from '../oferta-common/oferta-common.module';


@NgModule({
  declarations: [
    SennebogenMainComponent
  ],
  imports: [
    CommonModule,
    OfertaCommonModule,
    SennebogenRoutingModule,
    PreloadDirectivesModule,
    CardPersonModule,
    

    MaszynyNoweModule,

    
  ]
})
export class SennebogenModule { }
