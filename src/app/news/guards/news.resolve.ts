import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsDataFactoryService } from '../newsServices/news-data-factory.service';
import { NewsServicesModule } from '../newsServices/news-services.module';
import { INewsPayload } from '../interfaces/i-news-payload';



@Injectable({
        providedIn: NewsServicesModule
    })
export class NewsResolve implements Resolve<INewsPayload> {

    /**
     *
     */
    constructor(
           private df: NewsDataFactoryService
        ) {
    }

    resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): INewsPayload | Observable<INewsPayload> | Promise<INewsPayload> {
        const id = route.params['id'];
        return this.df.getById(id);
    }
}
