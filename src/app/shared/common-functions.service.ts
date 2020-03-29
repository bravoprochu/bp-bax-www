import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, fromEvent, of, merge, Observable } from 'rxjs';
import { IWindowBasicInfo } from '../otherModules/svg/interfaces/i-window-basic-info';
import { DomSanitizer, Title, Meta } from '@angular/platform-browser';
import * as hammerjs from 'hammerjs';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionsService {

  windowBasicInfo: IWindowBasicInfo = <IWindowBasicInfo>{};
  navHeight: number = 50;


  constructor(
    private sanitzer: DomSanitizer,
    private metaTitle: Title,
    private metaMeta: Meta
  ) {
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

  initHammer(nativeElementToSwipeOn: any): HammerManager{
    const hammerManager = new hammerjs(nativeElementToSwipeOn, {
      recognizers:[
        [Hammer.Swipe, {direction: Hammer.DIRECTION_HORIZONTAL}],
        [Hammer.Tap, {enable: false}],
        [Hammer.Pinch, {enable: false}],
        [Hammer.Rotate, {enable: false}],
      ]
    })
    return hammerManager;
  }

  // initHammerjs(nativeElementToSwipeOn: any, isNext:boolean, goNext: any, isPrev: boolean, goPrev: any){
  //   const hammerManager = new Hammer(nativeElementToSwipeOn, {})

  //   hammerManager.get('swipe').set({direction: Hammer.DIRECTION_HORIZONTAL});
  //   hammerManager.get('pinch').set({enable: false});
  //   hammerManager.get('rotate').set({enable: false});

  //   hammerManager.on('swipe', (ev)=>{
  //     if(ev.direction == 2 && isNext) {
  //       // swipe left
  //       goNext();
  //     }
  //     if(ev.direction == 4 && isPrev) {
  //       // swipe right
  //       goPrev()
  //     }
  //   });
  // }



  metaTitleUpdate(subtitle: string){
    this.metaTitle.setTitle(`BAX | ${subtitle}`);
  }

  metaDescriptionUpdate(text: string){
    // let _descr = this.metaMeta.getTag('name=description');
    this.metaMeta.updateTag({
      name: 'description', 
      content: text
    })
  }

  metaOpenGraphProductTag(title: string, url: string, imgUrl: string ){
    this.metaMeta.updateTag({
      property: 'og:title',
      content: `BAX | ${title}`
    })
    this.metaMeta.updateTag({
      property: 'og:type',
      content: 'product'
    });
    this.metaMeta.updateTag({
      property: 'og:url',
      content: url
    });
    this.metaMeta.updateTag({
      property: 'og:image',
      content: imgUrl
    });

  }

  



}
