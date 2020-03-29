import { Component, OnInit, ViewChild, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import { Subject } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-news-article-date',
  templateUrl: './news-article-date.component.html',
  styleUrls: ['./news-article-date.component.css']
})

export class NewsArticleDateComponent implements OnInit, OnChanges {
  @Input('date') inputDate: string;
  date: Date;
  isSmall: boolean;
  mqAlias: string;


  ngOnDestroy(): void {
  this.isDestroyed$.next(true);
  this.isDestroyed$.complete();
  this.isDestroyed$.unsubscribe();
  }
  
  
  isDestroyed$: Subject<boolean> = new Subject();
  

  constructor(
    public cf: CommonFunctionsService,
    private mediaObserver: MediaObserver
  ) { }

  ngOnInit() {
    this.mediaObserver.media$.pipe(
      takeUntil(this.isDestroyed$),
    )
    .subscribe(
      (_data: MediaChange) => {
        this.isSmall = (_data.mqAlias == 'xs' || _data.mqAlias == 'sm') ? true : false;
        this.mqAlias = _data.mqAlias;
      },
      (err) => console.log(' error', err),
      // () => console.log(' finish..')
    )
    
  }

  ngOnChanges(changes: SimpleChanges) {
    this.date = changes.inputDate.currentValue ? new Date(changes.inputDate.currentValue) : null;
  }


}
