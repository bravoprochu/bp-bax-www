import { Component, OnInit } from '@angular/core';
import { NewsService } from '../newsServices/news.service';
import { INewsArticle } from '../interfaces/i-news-article';
import { BP_ANIM_BRICK_LIST } from 'src/app/animations/bp-anim-brick-list';
import { ActivatedRoute } from '@angular/router';
import { INewsArticleMini } from '../interfaces/i-news-article-mini';





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
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.news = this.activatedRoute.snapshot.data['data'];
   }

  
  detect($ev: boolean, article: INewsArticle ) {
    article.isIntersected = $ev;
  }
}
