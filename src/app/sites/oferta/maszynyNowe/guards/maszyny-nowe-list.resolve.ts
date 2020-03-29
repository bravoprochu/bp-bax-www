import { Resolve } from '@angular/router';
import { IBaxModelMaszynaNowa } from '../../interfaces/i-bax-model-maszyna-nowa';
import { Injectable } from '@angular/core';
import { MaszynyNoweDataFactoryService } from '../maszynyNoweServices/maszyny-nowe-data-factory.service';
import { MaszynyNoweServicesModule } from '../maszynyNoweServices/maszyny-nowe-services.module';

@Injectable({
    providedIn: MaszynyNoweServicesModule
})
export class MaszynyNoweListResolve implements Resolve<IBaxModelMaszynaNowa[]> {
    /**
     *
     */
    constructor(
        private df: MaszynyNoweDataFactoryService
    ) {
       
    }
    resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): IBaxModelMaszynaNowa[] | import("rxjs").Observable<IBaxModelMaszynaNowa[]> | Promise<IBaxModelMaszynaNowa[]> {
        return this.df.getList();
    }
}