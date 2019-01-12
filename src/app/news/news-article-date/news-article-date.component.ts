import { Component, OnInit, ViewChild, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';

@Component({
  selector: 'app-news-article-date',
  templateUrl: './news-article-date.component.html',
  styleUrls: ['./news-article-date.component.css']
})

export class NewsArticleDateComponent implements OnInit, OnChanges {
  @Input('date') inputDate: string;
  date: Date;
  mqAlias: string;
  

  constructor(
    private cf: CommonFunctionsService
  ) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    this.date = changes.inputDate.currentValue ? new Date(changes.inputDate.currentValue) : null;
  }

  isSmall():boolean {
      return this.cf.isSmall();
  }

}
