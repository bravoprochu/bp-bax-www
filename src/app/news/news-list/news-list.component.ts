import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { INewsArticle } from '../interfaces/i-news-article';
import { BP_ANIM_BRICK_LIST } from 'src/app/animations/bp-anim-brick-list';



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
  news: INewsArticle[]= [];
  constructor(
    private ns: NewsService
  ) { }

  ngOnInit() {
    this.news = this.ns.getNews();
    //this.news.forEach(f=>f.isIntersected = true);
  }

  
  detect($ev: boolean, article: INewsArticle ) {
    article.isIntersected = $ev;
  }

  orderByName() {
    this.isListShown = false;
    this.isOrderByNameAsc = !this.isOrderByNameAsc;
    this.news = this.ns.getNews();
    this.isListShown = true;
  }

  orderByDate() {
    this.isListShown = false;
    this.isOrderByDateAsc = !this.isOrderByDateAsc;
    //this.news = this.ns.getNews().sort( this.sortBy('creationDate', this.isOrderByNameAsc));
    this.isListShown = true;
  }
}
