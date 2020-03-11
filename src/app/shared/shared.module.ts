import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterGoBackComponent } from './router-go-back/router-go-back.component';
import { RouterModule } from '@angular/router';
import { ArticleContainerComponent } from './article-container/article-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SocialButtonsComponent } from './social-buttons/social-buttons.component'
import { CommonFunctionsService } from './common-functions.service';
import { HeaderComponent } from './header/header/header.component';
import { HeaderMenuBigComponent } from './header/header-menu-big/header-menu-big.component';
import { DeferLoadDirective } from './defer-load.directive';
import { PantoneToHexModule } from '../pantoneToHex/pantone-to-hex.module';
import { ArticleNavigationComponent } from './svg/article-navigation/article-navigation.component';
import { FillChangeDirective } from './directives/fill-change.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImgGalleryComponent } from './img-gallery/img-gallery.component';
import { MenuComponent } from './menu/menu.component';
import { MenuHorizontalComponent } from './menu-horizontal/menu-horizontal.component';
import { MenuCommonFunctionsService } from './menu-common-functions.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { VerticalMaskedImageComponent } from './vertical-masked-image/vertical-masked-image.component';
import { ImageModalViewerComponent } from './image-modal-viewer/image-modal-viewer.component';
import { VerticalImageGalleryComponent } from '../vertical-image-gallery/vertical-image-gallery.component';


@NgModule({
  entryComponents: [
    ImageModalViewerComponent,
  ],
  declarations: [
    RouterGoBackComponent,
    ArticleContainerComponent,
    SocialButtonsComponent,
    HeaderComponent,
    HeaderMenuBigComponent,
    MenuComponent,
    DeferLoadDirective,
    ArticleNavigationComponent,
    FillChangeDirective,
    ImgGalleryComponent,
    MenuHorizontalComponent,
    VerticalMaskedImageComponent,
    ImageModalViewerComponent,
    VerticalImageGalleryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    PantoneToHexModule,
    ReactiveFormsModule,
    ScrollingModule,
  ],
  exports: [
    CommonModule,
    ArticleContainerComponent,
    ArticleNavigationComponent,
    DeferLoadDirective,
    SocialButtonsComponent,
    FillChangeDirective,
    FlexLayoutModule,
    FormsModule,
    HeaderComponent,
    HeaderMenuBigComponent,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
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
    ScrollingModule,
    VerticalMaskedImageComponent,
    ImageModalViewerComponent,
    VerticalImageGalleryComponent,
  ],
  providers: [
    CommonFunctionsService,
    MenuCommonFunctionsService
  ]
})
export class SharedModule { }
