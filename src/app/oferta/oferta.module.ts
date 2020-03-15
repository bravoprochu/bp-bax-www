import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfertaComponent } from './oferta/oferta.component';
import { OfertaRoutingModule } from './oferta-routing.module';
import { OfertaItemComponent } from './products/oferta-item/oferta-item.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { OfertaItemSennebogenComponent } from './products/oferta-item-sennebogen/oferta-item-sennebogen.component';

@NgModule({
  declarations: [
    OfertaComponent,
    OfertaItemComponent,
    OfertaItemComponent,
    OfertaItemSennebogenComponent
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
