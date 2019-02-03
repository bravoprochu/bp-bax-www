import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfertaComponent } from './oferta/oferta.component';
import { OfertaRoutingModule } from './oferta-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ModelSpecComponent } from './model-spec/model-spec.component';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelMaszynyComponent } from './model-maszyny/model-maszyny.component';
import { MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    OfertaComponent,
    ModelSpecComponent,
    ModelListComponent,
    ModelMaszynyComponent,

    
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    SharedModule,
    CommonModule,
    OfertaRoutingModule,
  ], exports:[
    MatButtonModule,
    MatIconModule,
    SharedModule
  ]
})
export class OfertaModule {
  
 }
