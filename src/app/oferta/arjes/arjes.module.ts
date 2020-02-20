import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArjesRoutingModule } from './arjes-routing.module';
import { ArjesMainComponent } from './arjes-main/arjes-main.component';

@NgModule({
  declarations: [
    ArjesMainComponent
  ],
  imports: [
    CommonModule,
    ArjesRoutingModule
  ],
  exports: [ArjesMainComponent]
})
export class ArjesModule { }
