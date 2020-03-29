import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { BaxBauma2019SennebogenComponent } from './bax-bauma2019-sennebogen/bax-bauma2019-sennebogen.component';
import { BaxERoboczeSosnowiec2019Component } from './bax-erobocze-sosnowiec2019/bax-erobocze-sosnowiec2019.component';


import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { SvgCommonModule } from 'src/app/otherModules/svg/svg-common.module';

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
