import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleBlockComponent } from './title-block/title-block.component';



@NgModule({
  declarations: [TitleBlockComponent],
  imports: [
    CommonModule
  ],
  exports: [TitleBlockComponent]
})
export class OfertaCommonModule { }
