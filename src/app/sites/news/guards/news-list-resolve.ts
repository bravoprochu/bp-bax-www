import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { INewsArticle } from '../interfaces/i-news-article';
import { Observable } from 'rxjs';
import { NewsDataFactoryService } from '../newsServices/news-data-factory.service';
import { NewsServicesModule } from '../newsServices/news-services.module';
import { INewsArticleMini } from '../interfaces/i-news-article-mini';
import { RouteAnimationService } from 'src/app/route-animation.service';
import { switchMap, tap } from 'rxjs/operators';


@Injectable({
    providedIn: NewsServicesModule
})
export class NewsListResolve implements Resolve<INewsArticleMini[]> {

    /**
     *
     */
    constructor(
        private df: NewsDataFactoryService,
    ) {
    }

    resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): INewsArticleMini[] | Observable<INewsArticleMini[]> | Promise<INewsArticleMini[]> {
        return this.df.getAll();
    }
}
