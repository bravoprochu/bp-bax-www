import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgCommonFunctionsService } from './svg-common-functions.service';
import { BaxPreloaderDirective } from './directives/bax-preloader.directive';
import { SvgBackgroundComponent } from '../svg-background/svg-background.component';


@NgModule({
  declarations: [
    BaxPreloaderDirective,
    SvgBackgroundComponent,

  ],
  imports: [
    CommonModule
  ],
  providers: [
    SvgCommonFunctionsService
  ],
  exports: [
    BaxPreloaderDirective,
    SvgBackgroundComponent  
  ]
})
export class SvgCommonModule { }
