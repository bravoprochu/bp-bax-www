import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfertaTitleBlockComponent } from './oferta-title-block/oferta-title-block.component';



@NgModule({
  declarations: [OfertaTitleBlockComponent],
  imports: [
    CommonModule
  ],
  exports: [
    OfertaTitleBlockComponent
  ]
})
export class OfertaCommonModule { }
