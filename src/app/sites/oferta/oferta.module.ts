import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfertaComponent } from './oferta/oferta.component';
import { OfertaRoutingModule } from './oferta-routing.module';
import { OfertaItemComponent } from './oferta-item/oferta-item.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    OfertaComponent,
    OfertaItemComponent,
    OfertaItemComponent,
  ],
  imports: [
    CommonModule,
    OfertaRoutingModule,

    ScrollingModule
  ], 
  exports:[
    ScrollingModule
  ],
})
export class OfertaModule {    
 }
