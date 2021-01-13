import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class MetaUpdaterService {

  constructor(
    private metaMeta: Meta,
    private metaTitle: Title
  ) { }



  htmlTextToPlain(htmlText: string, maxStrings: number = 160): string {
    let res = '';
    let searching:boolean = true;
    
    while (searching) {
      let openingFirstIdx = htmlText.indexOf('<');
      let closingFirstIdx = htmlText.indexOf('>');
    
      if(openingFirstIdx<0 || closingFirstIdx<0) {
        searching = false;
      } else {
        let subStr = htmlText.substr(openingFirstIdx, (closingFirstIdx - openingFirstIdx+1));
        htmlText = htmlText.replace(subStr, '');     
      }
    }
    htmlText = htmlText.replace('"', '');
    res = htmlText.slice(0, maxStrings);

    return res;
  }


  metaTitleUpdate(subtitle: string){
    this.metaTitle.setTitle(`${subtitle} | BAX`);
  }

  metaDescriptionUpdate(text: string){
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
      property: 'og:image',
      content: imgUrl
    });

  }

}
