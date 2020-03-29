import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { IBaxModelMaszynaNowa } from '../../interfaces/i-bax-model-maszyna-nowa';
import { MaszynyNoweDataFactoryService } from '../maszynyNoweServices/maszyny-nowe-data-factory.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MaszynyNoweServicesModule } from '../maszynyNoweServices/maszyny-nowe-services.module';



@Injectable({
    providedIn: MaszynyNoweServicesModule
}
)
export class MaszynyNoweReslove implements Resolve<IBaxModelMaszynaNowa> {
    /**
     *
     */
    constructor(
        private df: MaszynyNoweDataFactoryService,
        private router: Router
    ) {
        
        
    }
    
    resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): IBaxModelMaszynaNowa | import("rxjs").Observable<IBaxModelMaszynaNowa> | Promise<IBaxModelMaszynaNowa> {
        const id = route.params["id"];
        return this.df.getById(id).pipe(
            catchError((err)=>this.errorHandler(err, this.router))
        );
    }


    errorHandler(err: HttpErrorResponse, router: Router) {
        //
        // if error - go to /oferta 
        //
        router.navigateByUrl("/oferta");
        return throwError(err);

    }
}


