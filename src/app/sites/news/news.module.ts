import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsArticleMiniComponent } from './news-article-mini/news-article-mini.component';
import { SharedModule } from '../../shared/shared.module';
import { NewsArticleComponent } from './news-article/news-article.component';
import { NewsArticleDateComponent } from './news-article-date/news-article-date.component';
import { NewsServicesModule } from './newsServices/news-services.module';
import { SvgCommonModule } from '../../otherModules/svg/svg-common.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { PantoneToHexModule } from '../../otherModules/pantoneToHex/pantone-to-hex.module';
import { FullscreenComponent } from './dialogs/fullscreen/fullscreen.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header/header.component';
import { MetaUpdaterModule } from 'src/app/otherModules/meta/meta-updater/meta-updater.module';
import { MetaUpdaterService } from 'src/app/otherModules/meta/meta-updater.service';



@NgModule({
  declarations: [
    HeaderComponent,
    NewsListComponent,
    NewsArticleMiniComponent,
    NewsArticleComponent,
    NewsArticleDateComponent,

    FullscreenComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
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
  entryComponents: [
      
    ],
})
export class NewsModule { }
