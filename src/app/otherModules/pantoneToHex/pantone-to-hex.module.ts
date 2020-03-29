import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPantoneToHex } from './interfaces/i-pantone-to-hex';
import { PantoneToHexService } from './pantone-to-hex.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    PantoneToHexService
  ]
})
export class PantoneToHexModule {

  
}
