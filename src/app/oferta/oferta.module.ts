import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfertaComponent } from './oferta/oferta.component';
import { OfertaRoutingModule } from './oferta-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaszynyNoweModule } from './maszynyNowe/maszyny-nowe.module';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { OfertaItemComponent } from './products/oferta-item/oferta-item.component';

@NgModule({
  declarations: [
    OfertaComponent,
    OfertaItemComponent,
    OfertaItemComponent
  ],
  imports: [
    CommonModule,
    OfertaRoutingModule,
    YouTubePlayerModule
  ], 
  exports:[
  ],
})
export class OfertaModule {
  
 }
