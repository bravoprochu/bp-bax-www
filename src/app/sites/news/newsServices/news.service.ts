import { Injectable } from '@angular/core';
import { INewsArticle } from '../interfaces/i-news-article';
import { NewsServicesModule } from './news-services.module';
import { INewsArticleMini } from '../interfaces/i-news-article-mini';


@Injectable({
  providedIn: NewsServicesModule
})
export class NewsService {
  isAscendindSortOrder: boolean;
  isSortByDate: boolean = true;

  constructor() { }


  filterListBySearch(newsList: INewsArticleMini[], searchPhrase: string):INewsArticleMini[] {
    
    const phrase =  !!searchPhrase ? searchPhrase.toLowerCase(): "";
      return newsList.filter(f=>(f.title).toLowerCase().includes(phrase));
  }


  isNext(data: INewsArticle): boolean {
    return;
  }
  isPrev(data: INewsArticle): boolean {
    const idx = this.getArticleIdx(data);
    return idx - 1 >= 0;
  }

  findById(id: string): INewsArticle {
    return;
  }

  getArticleIdx(data: INewsArticle): number {
    return;
  }

  getNext(data: INewsArticle): INewsArticle {
    return;
  }

  getNews(): INewsArticle[] {
    return this.isSortByDate ? this.getNewsByDate() : this.getNewsByName();
  }

  private getNewsByDate(): INewsArticle[] {
    return [];
  }

  private getNewsByName(): INewsArticle[] {
    return [];
  }

  getPrev(data: INewsArticle): INewsArticle {
    return;
  }

  sortBy(propName: string, isAsc: boolean) {
    return function (a: INewsArticle, b: INewsArticle) {
      if (a[propName] == undefined || b[propName] == undefined) { return }
      if (a[propName].toLocaleLowerCase() > b[propName].toLocaleLowerCase()) {
        return isAsc ? 1 : -1;
      }
      if (a[propName].toLocaleLowerCase() < b[propName].toLocaleLowerCase()) {
        return isAsc ? -1 : 1;
      }
      return 0
    }
  };

 

}
