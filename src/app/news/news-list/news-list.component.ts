import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { INewsArticle } from '../interfaces/i-news-article';
import { BP_ANIM_BRICK_LIST } from 'src/app/shared/article-container/animation/brick-list';
import { bp_anim_svg_init } from 'src/app/animations/bp_anim_svg-init';


@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  animations: [
    BP_ANIM_BRICK_LIST,
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
    this.news = this.ns.getNews().sort( this.sortBy('creationDate', this.isOrderByDateAsc));
    this.news.forEach(art=>art.isIntersected=false);
  }

  
  detect($ev: boolean, article: INewsArticle ) {
    article.isIntersected = $ev;
  }

  orderByName() {
    this.isListShown = false;
    this.isOrderByNameAsc = !this.isOrderByNameAsc;
    this.news = this.ns.getNews().sort( this.sortBy('id', this.isOrderByNameAsc));
    this.isListShown = true;
  }

  orderByDate() {
    this.isListShown = false;
    this.isOrderByDateAsc = !this.isOrderByDateAsc;
    this.news = this.ns.getNews().sort( this.sortBy('creationDate', this.isOrderByNameAsc));
    this.isListShown = true;
  }

  sortBy(propName: string, isAsc: boolean) {
    return function(a: INewsArticle, b: INewsArticle) {
        if(a[propName]== undefined || b[propName] == undefined) {return }
        if(a[propName].toLocaleLowerCase() > b[propName].toLocaleLowerCase()) {
      return isAsc ? 1: -1;
    }
    if(a[propName].toLocaleLowerCase() < b[propName].toLocaleLowerCase() ) {
      return isAsc ? -1 : 1;
    }
    return 0
  }
  };

}
