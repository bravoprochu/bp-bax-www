import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { BaxBauma2019SennebogenComponent } from './bax-bauma2019-sennebogen/bax-bauma2019-sennebogen.component';
import { SharedModule } from '../shared/shared.module';
import { BaxERoboczeSosnowiec2019Component } from './bax-erobocze-sosnowiec2019/bax-erobocze-sosnowiec2019.component';
import { SvgCommonModule } from '../shared/svg/svg-common.module';

import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    BaxBauma2019SennebogenComponent,
    BaxERoboczeSosnowiec2019Component
  ],
  imports: [
    CommonModule,
    SharedModule,

    MatCardModule,
    MatTabsModule,

    SvgCommonModule,
    InfoRoutingModule,

    
  ],
  exports: [
    
  ]
})
export class InfoModule { }
