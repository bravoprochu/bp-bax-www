import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgCommonFunctionsService } from './svg-common-functions.service';
import { BaxPreloaderDirective } from './directives/bax-preloader.directive';


@NgModule({
  declarations: [
    BaxPreloaderDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    SvgCommonFunctionsService
  ],
  exports: [
    BaxPreloaderDirective    
  ]
})
export class SvgCommonModule { }
