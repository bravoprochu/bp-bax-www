import { Injectable } from '@angular/core';
import { INewsArticle } from '../interfaces/i-news-article';
import { NewsServicesModule } from './news-services.module';


@Injectable({
  providedIn: NewsServicesModule
})
export class NewsService {
  isAscendindSortOrder: boolean;
  isSortByDate: boolean = true;

  constructor() { }


  isNext(data: INewsArticle): boolean {
    return;
    // const nextIdx = this.getArticleIdx(data) + 1;
    // return this.dataJson.length - 1 >= nextIdx;
  }
  isPrev(data: INewsArticle): boolean {
    const idx = this.getArticleIdx(data);
    return idx - 1 >= 0;
  }

  findById(id: string): INewsArticle {
    return;
    // return this.dataJson.find(f => f.id == id);
  }

  getArticleIdx(data: INewsArticle): number {
    return;
    // return this.getNews().indexOf(this.dataJson.find(f => f.id == data.id));
  }

  getNext(data: INewsArticle): INewsArticle {
    return;
    // const act = this.getArticleIdx(data);
    // if (this.isNext(data)) {
    //   return this.dataJson[act + 1];
    // }
  }

  getNews(): INewsArticle[] {
    return this.isSortByDate ? this.getNewsByDate() : this.getNewsByName();
  }

  private getNewsByDate(): INewsArticle[] {
    return [];
    // this.dataJson.sort(this.sortBy('creationDate', this.isAscendindSortOrder));
  }

  private getNewsByName(): INewsArticle[] {
    return [];
    // this.dataJson.sort(this.sortBy('name', this.isAscendindSortOrder));
  }

  getPrev(data: INewsArticle): INewsArticle {
    return;
    // const act = this.getArticleIdx(data);
    // if (this.isPrev(data)) {
    //   return this.dataJson[act - 1];
    // }
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
