import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfertaComponent } from './oferta/oferta.component';
import { OfertaRoutingModule } from './oferta-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaszynyNoweModule } from './maszynyNowe/maszyny-nowe.module';

@NgModule({
  declarations: [
    OfertaComponent,
  ],
  imports: [
    CommonModule,
    OfertaRoutingModule,
  ], 
  exports:[
  ],
})
export class OfertaModule {
  
 }
