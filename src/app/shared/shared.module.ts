import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterGoBackComponent } from './router-go-back/router-go-back.component';
import { RouterModule } from '@angular/router';
import { ArticleContainerComponent } from './article-container/article-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SvgCommonModule } from './svg/svg-common.module';
import { MatCardModule, MatSidenavModule, MatExpansionModule, MatButtonModule, MatIconModule, MatTabsModule, MatDividerModule, MatInputModule, MatSliderModule, MatCheckboxModule, MatListModule, MatSelectModule, MatTooltipModule} from '@angular/material';
import { FacebookButtonComponent } from './facebook-button/facebook-button.component'
import { CommonFunctionsService } from './common-functions.service';
import { HeaderComponent } from './header/header/header.component';
import { HeaderMenuBigComponent } from './header/header-menu-big/header-menu-big.component';
import { DeferLoadDirective } from './defer-load.directive';
import { DetectIntersectionDirective } from './directives/detect-intersection.directive';
import { PantoneToHexModule } from '../pantoneToHex/pantone-to-hex.module';
import { SvgButtonYoutubeComponent } from './svg/svg-button-youtube/svg-button-youtube.component';
import { ArticleNavigationComponent } from './svg/article-navigation/article-navigation.component';
import { FillChangeDirective } from './directives/fill-change.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BaxPreloaderDirective } from './directives/bax-preloader.directive';



@NgModule({
  declarations: [
    RouterGoBackComponent,
    ArticleContainerComponent,
    FacebookButtonComponent,
    HeaderComponent,
    HeaderMenuBigComponent,
    DeferLoadDirective,
    DetectIntersectionDirective,
    SvgButtonYoutubeComponent,
    ArticleNavigationComponent,
    FillChangeDirective,
    BaxPreloaderDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatTabsModule,
    MatTooltipModule,
    PantoneToHexModule,
    ReactiveFormsModule,
    SvgCommonModule,
    
    
  ],
  exports: [
    CommonModule,
    ArticleContainerComponent,
    ArticleNavigationComponent,
    DeferLoadDirective,
    DetectIntersectionDirective,
    FacebookButtonComponent,
    FillChangeDirective,
    FlexLayoutModule,
    FormsModule,
    HeaderComponent,
    HeaderMenuBigComponent,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatTabsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule,
    RouterGoBackComponent,
    SvgButtonYoutubeComponent,
    BaxPreloaderDirective,

  ],
  providers: [
    CommonFunctionsService,
  ]
})
export class SharedModule { }
