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
import { HeaderComponent } from './header/header/header.component';
import { HeaderMenuBigComponent } from './header/header-menu-big/header-menu-big.component';
import { DeferLoadDirective } from './defer-load.directive';
import { DetectIntersectionDirective } from './directives/detect-intersection.directive';
import { PantoneToHexModule } from '../pantoneToHex/pantone-to-hex.module';

@NgModule({
  declarations: [
    RouterGoBackComponent,
    ArticleContainerComponent,
    FacebookButtonComponent,
    HeaderComponent,
    HeaderMenuBigComponent,
    DeferLoadDirective,
    DetectIntersectionDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatCardModule,
    PantoneToHexModule,
    SvgCommonModule,
    
  ],
  exports: [
    CommonModule,
    RouterModule,
    RouterGoBackComponent,
    ArticleContainerComponent,
    FlexLayoutModule,
    MatCardModule,
    FacebookButtonComponent,
    HeaderComponent,
    HeaderMenuBigComponent,
    DeferLoadDirective,
    DetectIntersectionDirective,
  ],
  providers: [
    CommonFunctionsService
  ]
})
export class SharedModule { }
