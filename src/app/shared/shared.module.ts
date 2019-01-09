import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterGoBackComponent } from './router-go-back/router-go-back.component';
import { RouterModule } from '@angular/router';
import { ArticleContainerComponent } from './article-container/article-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SvgCommonModule } from './svg/svg-common.module';
import { MatCardModule} from '@angular/material';
import { FacebookButtonComponent } from './facebook-button/facebook-button.component'
import { CommonFunctionsService } from './common-functions.service';

@NgModule({
  declarations: [
    RouterGoBackComponent,
    ArticleContainerComponent,
    FacebookButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatCardModule,
    SvgCommonModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    RouterGoBackComponent,
    ArticleContainerComponent,
    FlexLayoutModule,
    MatCardModule,
    FacebookButtonComponent,
  ],
  providers: [
    CommonFunctionsService
  ]
})
export class SharedModule { }
