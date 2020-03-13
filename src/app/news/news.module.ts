import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsArticleMiniComponent } from './news-article-mini/news-article-mini.component';
import { SharedModule } from '../shared/shared.module';
import { NewsArticleComponent } from './news-article/news-article.component';
import { NewsArticleDateComponent } from './news-article-date/news-article-date.component';
import { NewsServicesModule } from './newsServices/news-services.module';
import { SvgCommonModule } from '../shared/svg/svg-common.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { PantoneToHexModule } from '../pantoneToHex/pantone-to-hex.module';
import { FullscreenComponent } from './dialogs/fullscreen/fullscreen.component';





@NgModule({
  entryComponents: [
    FullscreenComponent
  ],
  declarations: [
    NewsListComponent,
    NewsArticleMiniComponent,
    NewsArticleComponent,
    NewsArticleDateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PantoneToHexModule,
    SvgCommonModule,

    FormsModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,

    NewsServicesModule,
    NewsRoutingModule,
  ],
  exports: [
    ],
})
export class NewsModule { }
