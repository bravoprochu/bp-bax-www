import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { NewsServicesModule } from './news-services.module';
import { INewsArticle } from '../interfaces/i-news-article';
import { NewsModule } from '../news.module';
import { INewsArticleMini } from '../interfaces/i-news-article-mini';
import { INewsPayload } from '../interfaces/i-news-payload';


@Injectable({
  providedIn: NewsServicesModule
})
export class NewsDataFactoryService {
  constructor(
     private httpClient: HttpClient
  ) { 
  }

  private getHeaders() {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': environment.serverUrl
    })
  }

  getAll(): Observable<INewsArticleMini[]>{
    return <Observable<INewsArticleMini[]>>this.httpClient.get(environment.news.apiUrlNewsList, {headers: this.getHeaders()})
    .pipe(
    );
  }

  getById(id: string): Observable<INewsPayload> {
    return <Observable<INewsPayload>>this.httpClient.get(`${environment.news.apiUrlNewsGetById}/${id}`, {headers: this.getHeaders()})
  }
}
