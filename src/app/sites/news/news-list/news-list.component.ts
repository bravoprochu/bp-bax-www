import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../newsServices/news.service';
import { INewsArticle } from '../interfaces/i-news-article';
import { BP_ANIM_BRICK_LIST } from 'src/app/shared/animations/bp-anim-brick-list';
import { INewsArticleMini } from '../interfaces/i-news-article-mini';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { NewsDataFactoryService } from '../newsServices/news-data-factory.service';
import { Subject } from 'rxjs';
import { SvgCommonFunctionsService } from 'src/app/otherModules/svg/svg-common-functions.service';
import { MatDialog } from '@angular/material/dialog';
import { FullscreenComponent } from '../dialogs/fullscreen/fullscreen.component';





@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  animations: [
    BP_ANIM_BRICK_LIST(),
  ]
})
export class NewsListComponent implements OnInit, OnDestroy {
 
  constructor(
    private ncf: NewsService,
    private newsDataService: NewsDataFactoryService,
    private svgCf: SvgCommonFunctionsService,
    private dialog: MatDialog

  ) { }


  ballsPreload: string;
  isDataReady: boolean;
  isListShown: boolean =true;
  isOrderByDateAsc: boolean = false;
  isOrderByNameAsc: boolean = true;
  news: INewsArticleMini[]= [];
  newsList: INewsArticleMini[]= [];
  search$: FormControl;
  isDestroyed$: Subject<boolean> = new Subject()
  
  
  ngOnDestroy(): void {
       this.isDestroyed$.next(true);
       this.isDestroyed$.complete();
       this.isDestroyed$.unsubscribe();
  }


  ngOnInit() {
    this.dialog.open(FullscreenComponent, {
      minHeight: '100vh',
      minWidth: '100vw',
      hasBackdrop: false,
    }).afterClosed()
    .subscribe(
         (fullscreenClosed:any)=>{
              console.log('fullscreenClosed subs:', fullscreenClosed);
              
         },
         (error)=>console.log('fullscreenClosed error', error),
         ()=>console.log('fullscreenClosed completed..')
    );



    this.ballsPreload = this.svgCf.getOriginUrl("assets/svg/preloaders/balls-horizontal-preloader.svg");
    this.newsDataService.getAll()
    .subscribe(
         (_newsData:any)=>{
              this.newsList = _newsData;
              this.isDataReady = true;
              this.news = this.ncf.filterListBySearch(this.newsList, null);
         },
         (error)=>console.log('_newsData error', error),
         ()=>console.log('_newsData completed..')
    );



    this.search$ = new FormControl();

    this.search$
    .valueChanges.pipe(
     debounceTime(500),
     distinctUntilChanged(),
     startWith(null)
    ).subscribe(
      (searchPhrase:string)=>{
        this.news = this.ncf.filterListBySearch(this.newsList, searchPhrase);        
      }
    )
   }

  
  detect($ev: boolean, article: INewsArticle ) {
    article.isIntersected = $ev;
  }
}
