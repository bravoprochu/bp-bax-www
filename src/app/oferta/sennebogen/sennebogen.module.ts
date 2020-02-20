import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SennebogenRoutingModule } from './sennebogen-routing.module';
import { SennebogenMainComponent } from './sennebogen-main/sennebogen-main.component';
import { CardPersonModule } from 'src/app/common/card-person/card-person.module';
import { OfertaCommonModule } from '../oferta-common/oferta-common.module';

@NgModule({
  declarations: [
    SennebogenMainComponent
    
    
  ],
  imports: [
    CommonModule,
    OfertaCommonModule,
    CardPersonModule,
    SennebogenRoutingModule
  ]
})
export class SennebogenModule { }
