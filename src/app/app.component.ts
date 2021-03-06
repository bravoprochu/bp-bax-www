import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ResolveStart, ResolveEnd, RouterOutlet } from '@angular/router';
import { routeAnimation } from './shared/animations/routeAnimations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { bp_anim_width } from './shared/animations/bp_anim_width';
import { BP_ANIM_ENTER_LEAVE_FROM_SIDE } from './shared/animations/bp_anim_enter_leave_from_side';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    routeAnimation,
    BP_ANIM_ENTER_LEAVE_FROM_SIDE(500, 100),
    bp_anim_width(750, 500),
  ]
})

export class AppComponent implements OnInit {
  @ViewChild('mainContent', {static: true }) mainContent: ElementRef;
  prepareRoute(outlet: RouterOutlet) {
     return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  isInProgress: boolean;
  isResolving: boolean;
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
    private scrollDispatcher: ScrollDispatcher,
    private ngZone: NgZone,
    private mediaObserver: MediaObserver,
    private router: Router  ) {

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

  animWidthIsDone() {
    this.isResolving = true;
  }

  
 

  checkRouterEvent(_data: Event) {
    if(_data instanceof NavigationStart) {
    }
    
    if (_data instanceof ResolveStart) { 
      this.isInProgress = true;
    } 
    if(_data instanceof ResolveEnd) {
      this.isInProgress = false;
      this.isResolving = false;
    }
    if (_data instanceof NavigationEnd || _data instanceof NavigationError || _data instanceof NavigationCancel) { 
      this.isInProgress = false;
    }
  }

  scrollToTop() {
    (<HTMLElement>this.mainContent.nativeElement).scrollTo({ top: 0, behavior: 'smooth' });
  }

}
