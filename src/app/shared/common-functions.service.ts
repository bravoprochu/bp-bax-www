import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, fromEvent, of, merge } from 'rxjs';
import { MediaObserver, MediaChange, } from '@angular/flex-layout';
import { takeUntil, map, switchMap, tap } from 'rxjs/operators';
import { IWindowBasicInfo } from './svg/interfaces/i-window-basic-info';
import { _getTestBedRender3 } from '@angular/core/testing/src/r3_test_bed';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionsService implements OnDestroy, OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  private isDestroyed$: Subject<boolean>;
  private _mediaChange: MediaChange;
  windowBasicInfo: IWindowBasicInfo = <IWindowBasicInfo>{};


  constructor(
    private mediaObserver: MediaObserver,
    private sanitzer: DomSanitizer,
  ) {
    this.isDestroyed$ = new Subject();

    //
    // 
    //
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


  convDocumentToWindowBasicInfo(doc: Document): IWindowBasicInfo {
    return {
      height: doc.defaultView.innerHeight,
      isPortrait: doc.defaultView.innerWidth >= doc.defaultView.innerHeight ? true : false,
      width: doc.defaultView.innerWidth,
      scrollY: doc.defaultView.scrollY,
      scrollX: doc.defaultView.scrollX
    }
  }

  getWindowBasicInfo$ = (isDestroyed$: Subject<boolean>) => {
    const scroll$ = fromEvent(window, 'scroll');
    const resize$ = fromEvent(window, 'resize');
    let _windowBasicInfo: IWindowBasicInfo = <IWindowBasicInfo>{};

    return merge(scroll$, resize$)
      .pipe(
        takeUntil(isDestroyed$),
        map(_ev => _ev.target),
        switchMap(_ev => {
          if (_ev instanceof Window) {
            _windowBasicInfo = {
              height: _ev.innerHeight,
              isPortrait: _ev.innerWidth >= _ev.innerHeight ? true : false,
              width: _ev.innerWidth,
              scrollX: _ev.scrollX,
              scrollY: _ev.screenY,
            }
          }
          if (_ev instanceof Document) {
            _windowBasicInfo = {
              height: _ev.defaultView.innerHeight,
              isPortrait: _ev.defaultView.innerWidth >= _ev.defaultView.innerHeight ? true : false,
              width: _ev.defaultView.innerWidth,
              scrollY: _ev.defaultView.scrollY,
              scrollX: _ev.defaultView.scrollX
            }
          }
          return this.mediaObserver.media$.pipe(
            takeUntil(isDestroyed$)
          )
        }
        ),
        map((_data: MediaChange) => {
          _windowBasicInfo.mediaAlias = _data.mqAlias;
          _windowBasicInfo.mediaQuery = _data.mediaQuery;
          return _windowBasicInfo;
        })
      );
  }

  getMediaChange(): MediaChange {
    return this._mediaChange;
  }

  getUrlPath(elName: string): any {
    return this.sanitzer.bypassSecurityTrustStyle(`url(${window.location.href}#${elName})`);
  }

  isViewXs(): boolean {
    return this.getMediaChange().mqAlias == 'xs';
  }

  isViewSm(): boolean {
    return this.getMediaChange().mqAlias == 'sm';
  }



  isSmall() {
    return (this.getMediaChange().mqAlias == 'xs' || this.getMediaChange().mqAlias == 'sm') ? true : false;
  }

  isGtMd() {
    return (this.getMediaChange().mqAlias == 'lg' || this.getMediaChange().mqAlias == 'xl') ? true : false;
  }




}
