import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuidettiRoutingModule } from './guidetti-routing.module';
import { GuidettiMainComponent } from './guidetti-main/guidetti-main.component';


@NgModule({
  declarations: [GuidettiMainComponent],
  imports: [
    CommonModule,
    GuidettiRoutingModule
  ],
  exports: [GuidettiMainComponent]
})
export class GuidettiModule { }
