import { Component, OnInit } from '@angular/core';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-bax-bauma2019-sennebogen',
  templateUrl: './bax-bauma2019-sennebogen.component.html',
  styleUrls: ['./bax-bauma2019-sennebogen.component.css']
})
export class BaxBauma2019SennebogenComponent implements OnInit {
  isReady: boolean;
  isBaumaImgReady: boolean;
  isSmall: boolean;
  baumaUrl: string = './assets/info/SENNEBOGEN_green_heart_of_bauma.png';
  imgSrcUrl: string = './assets/info/bax_bauma_2019_sennebogen.png';
  prelaoderUrl: string = './assets/svg/preloaders/sennebogen-preloader.svg';

  svgPL: string = './assets/info/bax-bauma2019-sennebogen-voucher-info-PL.svg';
  svgEN: string = './assets/info/bax-bauma2019-sennebogen-voucher-info-EN.svg';
  svgDE: string = './assets/info/bax-bauma2019-sennebogen-voucher-info-DE.svg';
  
  ngOnDestroy(): void {
  this.isDestroyed$.next(true);
  this.isDestroyed$.complete();
  this.isDestroyed$.unsubscribe();
  }
  
  
  isDestroyed$: Subject<boolean> = new Subject();
  
  // imgSrc: any;
  
  constructor(
    private mediaObserver: MediaObserver,
    public cf: CommonFunctionsService
  ) { }

  ngOnInit() {
    this.cf.metaTitleUpdate('Bauma 2019, Sennebogen voucher info')
    this.mediaObserver.media$.pipe(
      takeUntil(this.isDestroyed$),
    )
    .subscribe(
      (_data: MediaChange) => {
        this.isSmall = (_data.mqAlias == 'xs' || _data.mqAlias == 'sm') ? true : false;
      },
      (err) => console.log(' error', err),
      () => console.log(' finish..')
    )
  }

}
