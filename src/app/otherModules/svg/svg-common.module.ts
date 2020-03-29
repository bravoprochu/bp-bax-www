import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgCommonFunctionsService } from './svg-common-functions.service';
import { BaxPreloaderDirective } from './directives/bax-preloader.directive';
import { SvgBackgroundComponent } from './svg-background/svg-background.component';
import { SvgButtonYoutubeComponent } from './svg-button-youtube/svg-button-youtube.component';


@NgModule({
  declarations: [
    SvgButtonYoutubeComponent,
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
    SvgButtonYoutubeComponent,
    BaxPreloaderDirective,
    SvgBackgroundComponent  
  ]
})
export class SvgCommonModule { }
