import { Component, OnInit } from '@angular/core';
import { NewsService } from '../newsServices/news.service';
import { INewsArticle } from '../interfaces/i-news-article';
import { BP_ANIM_BRICK_LIST } from 'src/app/animations/bp-anim-brick-list';
import { ActivatedRoute } from '@angular/router';
import { INewsArticleMini } from '../interfaces/i-news-article-mini';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';





@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  animations: [
    BP_ANIM_BRICK_LIST(),
  ]
})
export class NewsListComponent implements OnInit {
  isListShown: boolean =true;
  isOrderByDateAsc: boolean = false;
  isOrderByNameAsc: boolean = true;
  news: INewsArticleMini[]= [];
  newsList: INewsArticleMini[]= [];
  search$: FormControl;
  
  constructor(
    private cf: CommonFunctionsService,
    private ncf: NewsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.newsList = this.activatedRoute.snapshot.data['data'];
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



    this.cf.metaTitleUpdate(`NEWS`);
    this.cf.metaDescriptionUpdate('Najnowsze informacje BAX maszyny. Aktualności dotyczące maszyn Sennebogen, Yanmar, Goudetti. Promocje na części, oferty pracy, katalog usług serwisowych')
   }

  
  detect($ev: boolean, article: INewsArticle ) {
    article.isIntersected = $ev;
  }
}
