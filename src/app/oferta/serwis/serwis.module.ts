import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SerwisRoutingModule } from './serwis-routing.module';
import { SerwisMainComponent } from './serwis-main/serwis-main.component';

@NgModule({
  declarations: [
    SerwisMainComponent
  ],
  imports: [
    CommonModule,
    SerwisRoutingModule
  ],
  exports: [SerwisMainComponent]
})
export class SerwisModule { }
