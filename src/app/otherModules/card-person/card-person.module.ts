import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPersonComponent } from './card-person/card-person.component';



@NgModule({
  declarations: [
    CardPersonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardPersonComponent
  ]
})
export class CardPersonModule { }
