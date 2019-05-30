import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, fromEvent, of, merge, Observable } from 'rxjs';
import { IWindowBasicInfo } from './svg/interfaces/i-window-basic-info';
import { DomSanitizer, Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionsService {

  windowBasicInfo: IWindowBasicInfo = <IWindowBasicInfo>{};


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



  metaTitleUpdate(subtitle: string){
    this.metaTitle.setTitle(`BAX | ${subtitle}`);
  }

  metaDescriptionUpdate(text: string){
    let _descr = this.metaMeta.getTag('name=description');
    this.metaMeta.updateTag({
      name: 'description', 
      content: text
    })
  }

  



}
