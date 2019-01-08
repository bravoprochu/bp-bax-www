import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterGoBackComponent } from './router-go-back/router-go-back.component';
import { RouterModule } from '@angular/router';
import { ArticleContainerComponent } from './article-container/article-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SvgCommonModule } from './svg/svg-common.module';

@NgModule({
  declarations: [
    RouterGoBackComponent,
    ArticleContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SvgCommonModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    RouterGoBackComponent,
    ArticleContainerComponent,
    FlexLayoutModule
  ],
  providers: [

  ]
})
export class SharedModule { }
