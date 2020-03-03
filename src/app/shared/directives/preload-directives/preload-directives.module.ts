import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaxImgPreloaderDirective } from '../bax-img-preloader.directive';



@NgModule({
  declarations: [
    BaxImgPreloaderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BaxImgPreloaderDirective
  ]

})
export class PreloadDirectivesModule { }
