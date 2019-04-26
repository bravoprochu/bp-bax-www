import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterGoBackComponent } from './router-go-back/router-go-back.component';
import { RouterModule } from '@angular/router';
import { ArticleContainerComponent } from './article-container/article-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SvgCommonModule } from './svg/svg-common.module';
import { MatCardModule, MatSidenavModule, MatExpansionModule, MatButtonModule, MatIconModule, MatTabsModule, MatDividerModule, MatInputModule, MatSliderModule, MatCheckboxModule, MatListModule, MatSelectModule, MatTooltipModule, MatToolbarModule} from '@angular/material';
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
import { ImgGalleryComponent } from './img-gallery/img-gallery.component';
import { MenuComponent } from './menu/menu.component';
import { MenuHorizontalComponent } from './menu-horizontal/menu-horizontal.component';
import { MenuCommonFunctionsService } from './menu-common-functions.service';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    RouterGoBackComponent,
    ArticleContainerComponent,
    FacebookButtonComponent,
    HeaderComponent,
    HeaderMenuBigComponent,
    MenuComponent,
    DeferLoadDirective,
    DetectIntersectionDirective,
    SvgButtonYoutubeComponent,
    ArticleNavigationComponent,
    FillChangeDirective,
    BaxPreloaderDirective,
    ImgGalleryComponent,
    MenuHorizontalComponent
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
    MatToolbarModule,
    MatTooltipModule,
    PantoneToHexModule,
    ReactiveFormsModule,
    ScrollDispatchModule,
    SvgCommonModule,
    
    
  ],
  exports: [
    CommonModule,
    ArticleContainerComponent,
    ArticleNavigationComponent,
    BaxPreloaderDirective,
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
    MatToolbarModule,
    MatTooltipModule,
    MenuComponent,
    ReactiveFormsModule,
    RouterModule,
    RouterGoBackComponent,
    ImgGalleryComponent,
    MenuHorizontalComponent,
    ScrollDispatchModule,
    SvgButtonYoutubeComponent,

  ],
  providers: [
    CommonFunctionsService,
    MenuCommonFunctionsService
  ]
})
export class SharedModule { }
