import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SocialButtonsComponent } from './social-buttons/social-buttons.component'
import { CommonFunctionsService } from './common-functions.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TestComponent } from './test/test.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    SocialButtonsComponent,
    TestComponent,
    
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ScrollingModule,
    
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    SocialButtonsComponent,
    ScrollingModule,
    TestComponent
  ],
  providers: [
    CommonFunctionsService,
  ]
})
export class SharedModule { }
