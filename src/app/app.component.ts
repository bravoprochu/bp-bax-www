import { Component, OnInit, HostListener, AfterViewInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import { RouterOutlet, Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ResolveStart } from '@angular/router';
import { routeAnimation } from './animations/routeAnimations';
import { CommonFunctionsService } from './shared/common-functions.service';
import { Subject } from 'rxjs';
import { takeUntil, map, merge } from 'rxjs/operators';
import { BP_ANIM_ENTER_LEAVE_FROM_SIDE } from './animations/bp_anim_apear_from_side';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { bp_anim_width } from './animations/bp_anim_width';
import { BP_ANIM_FROM_TOP } from './animations/bp_anim_from_top';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    routeAnimation,
    BP_ANIM_ENTER_LEAVE_FROM_SIDE(500, 100),
    bp_anim_width(),
    BP_ANIM_FROM_TOP(1500,2100)
  ]
})

export class AppComponent implements OnInit {
  @ViewChild('mainContent') mainContent: ElementRef;
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  isInProgress: boolean;
  isScrollShown: boolean;
  isSmall: boolean;
  isTrue: boolean;
  text: string;

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
    this.isDestroyed$.unsubscribe();
  }


  isDestroyed$: Subject<boolean> = new Subject();
  /**
   *
   */
  constructor(
    private cf: CommonFunctionsService,
    public scrollDispatcher: ScrollDispatcher,
    private ngZone: NgZone,
    private mediaObserver: MediaObserver,
    private router: Router
  ) {

  }

  ngOnInit() {

    this.router.events.subscribe(
      (_data: Event) => {
        this.checkRouterEvent(_data);
      },
      (err) => console.log('router ev: error', err),
      () => console.log('router ev: finish..')
    )


    this.scrollDispatcher.scrolled()
      .pipe(
        takeUntil(this.isDestroyed$),
      )
      .subscribe(
        ((_data: CdkScrollable) => {
          const d = _data.getElementRef().nativeElement.scrollTop;
          this.ngZone.run(() => {
            this.isScrollShown = d > 100 ? true : false;
          })
        })
      );


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






  checkRouterEvent(_data: Event) {
    if (_data instanceof ResolveStart) { 
      this.isInProgress = true; 
    }
    if (_data instanceof NavigationEnd || _data instanceof NavigationCancel || _data instanceof NavigationError) { 
      this.isInProgress = false;
    }
  }


  mainContentScrolled(data: CdkScrollable) {
    const d = data.getElementRef().nativeElement.scrollTop;

    this.ngZone.run(() => {
      this.isScrollShown = d > 100 ? true : false;
    })
  }

  scrollToTop() {
    (<HTMLElement>this.mainContent.nativeElement).scrollTo({ top: 0, behavior: 'smooth' });
  }


}
