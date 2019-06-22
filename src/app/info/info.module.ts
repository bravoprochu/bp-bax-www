import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { BaxBauma2019SennebogenComponent } from './bax-bauma2019-sennebogen/bax-bauma2019-sennebogen.component';
import { SharedModule } from '../shared/shared.module';
import { BaxERoboczeSosnowiec2019Component } from './bax-erobocze-sosnowiec2019/bax-erobocze-sosnowiec2019.component';

@NgModule({
  declarations: [
    BaxBauma2019SennebogenComponent,
    BaxERoboczeSosnowiec2019Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    InfoRoutingModule
  ],
  exports: [
    
  ]
})
export class InfoModule { }
