import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, fromEvent, of, merge, Observable } from 'rxjs';
import { MediaObserver, MediaChange, } from '@angular/flex-layout';
import { takeUntil, map, switchMap, tap } from 'rxjs/operators';
import { IWindowBasicInfo } from './svg/interfaces/i-window-basic-info';
import { _getTestBedRender3 } from '@angular/core/testing/src/r3_test_bed';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionsService implements OnDestroy {

  private isDestroyed$: Subject<boolean>;
  private _mediaChange$: any;
  windowBasicInfo: IWindowBasicInfo = <IWindowBasicInfo>{};


  constructor(
    private sanitzer: DomSanitizer,
  ) {
    this.isDestroyed$ = new Subject();
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


  getUniqueId(prefix?: string):string {
    return prefix + Math.random().toString().replace(',', "").replace('.', "");
  }

  getUrlPath(elName: string): any {
    return this.sanitzer.bypassSecurityTrustStyle(`url(${window.location.href}#${elName})`);
  }






}
