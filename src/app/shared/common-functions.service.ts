import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionsService implements OnDestroy {
  private isDestroyed$: Subject<boolean>;
  private _mediaChange: MediaChange;

  constructor(
    private mediaObserver: MediaObserver,
  ) {
    this.isDestroyed$ = new Subject();
    this.mediaObserver.media$.pipe(
      takeUntil(this.isDestroyed$)
    )
    .subscribe(
      (_data: MediaChange) => {
      this._mediaChange = _data;
      },
      (err) => console.log('commonFn service error', err),
      () => console.log('commonFn service finish..')
    )
   }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }

  cloneObject(src: any) {
    return JSON.stringify(src);
  }

  getMediaChange(): MediaChange {
    return this._mediaChange;
  }
  isSmall() {
    return (this.getMediaChange().mqAlias== 'xs' || this.getMediaChange().mqAlias== 'sm') ? true : false;
  }



}
