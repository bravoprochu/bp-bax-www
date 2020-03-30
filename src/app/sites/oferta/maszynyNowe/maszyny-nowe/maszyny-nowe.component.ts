import { Component, OnInit, AfterViewInit, ViewChild, Input, ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { IBaxModelMaszynyNoweFilterLine } from '../../interfaces/i-bax-model-maszyny-nowe-filter-line';
import { PantoneToHexService } from 'src/app/otherModules/pantoneToHex/pantone-to-hex.service';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { FormGroup } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { takeUntil, delay, tap, debounceTime } from 'rxjs/operators';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute, Params } from '@angular/router';
import { MaszynyNoweService } from '../maszynyNoweServices/maszyny-nowe.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MaszynyNoweDataFactoryService } from '../maszynyNoweServices/maszyny-nowe-data-factory.service';
import { MatDialog } from '@angular/material/dialog';
import { MaszynyNoweFilterComponent } from '../maszyny-nowe-filter/maszyny-nowe-filter.component';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';
import { BP_ANIM_ENTER_LEAVE_FROM_SIDE } from 'src/app/shared/animations/bp_anim_enter_leave_from_side';



@Component({
  selector: 'app-maszyny-nowe',
  templateUrl: './maszyny-nowe.component.html',
  styleUrls: ['./maszyny-nowe.component.css'],
  animations: [
    BP_ANIM_ENTER_LEAVE_FROM_SIDE(500, 100),
  ]
})
export class MaszynyNoweComponent implements OnInit {
  @ViewChild('drawer', {static: false}) drawer: MatDrawer;
  @ViewChild('modelList', {static: false}) modelList!: ElementRef;

  @Input('queryParams') queryParams: Params;
  

  colorEven: string;
  colorOdd: string;
  filterData: IBaxModelMaszynyNoweFilterLine[] = [];
  filterForm$: FormGroup;
  isDataLoaded: boolean;
  isOptionButtonShown: boolean;
  isLengthCount: boolean = true;
  isSidenavOpen: boolean;
  isSmall:boolean;
  mqAlias: string;
  routeParams: Params;
  topOffset:number;
  
  
  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
    this.isDestroyed$.unsubscribe();
  }


  isDestroyed$: Subject<boolean> = new Subject();


  constructor(
    private df: MaszynyNoweDataFactoryService,
    public mnSrv: MaszynyNoweService,
    private cf: CommonFunctionsService,
    private pantoSrv: PantoneToHexService,
    private mediaObserver: MediaObserver,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private scrollDispatcher: ScrollDispatcher,
    private ngZone: NgZone,
    private changeDetection: ChangeDetectorRef
  ) { }

  ngOnInit() {

    
    this.isDataLoaded = false;

    this.initRouteParams();
    this.initData();


    this.cf.metaTitleUpdate('maszyny przeładunkowe Sennebogen, maszyny budowlane Yanmar');

    
    const colorPalete = this.pantoSrv.getNextPaletteColors("283", 2, 1);
    const opacity = 0.25;
    this.colorEven = this.pantoSrv.colorToRGBA(colorPalete[0], opacity);
    this.colorOdd = this.pantoSrv.colorToRGBA(colorPalete[1], opacity);

    this.mediaObserver.media$.pipe(
      takeUntil(this.isDestroyed$),
    )
    .subscribe(
      (_data: MediaChange) => {
        this.isSmall = (_data.mqAlias == 'xs' || _data.mqAlias == 'sm') ? true : false;
        this.mqAlias = _data.mqAlias;
      },
      (err) => console.log(' error', err)
    )
  }



  initData() {
    this.isDataLoaded = false;
    this.df.getList()
    .subscribe(
          (_maszynyNoweAll:any)=>{
              this.mnSrv.maszynyNoweListAvailable = _maszynyNoweAll;
              this.mnSrv.initData(this.routeParams);
              this.isDataLoaded = true;
              this.changeDetection.detectChanges();
              this.initScrollDispatcher();
              this.initObservable()

          },
          (error)=>console.log('_maszynyNoweAll error', error),
          ()=>console.log('_maszynyNoweAll completed..')
    );
  }

  initRouteParams() {
    this.routeParams =  this.queryParams ? this.queryParams : this.activatedRoute.snapshot.queryParams;
  }


  initCardInfoAndModalOpen() {
    of(1).pipe(
      tap(()=>{
      this.mnSrv.isModelSpecCardInfo.setValue(true);
      },
    ),
    delay(5000),
    tap(()=>{
      this.mnSrv.isModelSpecCardInfo.setValue(false);
    }),
    delay(1000)
    )
    .subscribe(
        (sideNavOpen_timeout$:any)=>{
              this.mnSrv.isModelSpecCardInfo.setValue(false, {emitEvent: true});
              this.filterDialogOpen();
              
        },
        (error)=>console.log('sideNavOpen_timeout$ error', error),
        ()=>console.log('sideNavOpen_timeout$ completed..')
    );
  }

  initScrollDispatcher() {
    const buttonMargin = 10;
    let sectionRectTop = ((<HTMLDivElement>this.modelList.nativeElement).getBoundingClientRect().top);
    
    this.isOptionButtonShown = sectionRectTop <= 60 ? true: false
    this.topOffset = sectionRectTop + buttonMargin;

    this.scrollDispatcher.scrolled().pipe(
      takeUntil(this.isDestroyed$),
      tap(()=>this.isOptionButtonShown=false),
      debounceTime(500)
    )
    .subscribe(
         (_scroller:CdkScrollable)=>{
          sectionRectTop = ((<HTMLDivElement>this.modelList.nativeElement).getBoundingClientRect().top);
          this.ngZone.run(()=>{
            this.topOffset = sectionRectTop >= 60 ?  (sectionRectTop + buttonMargin) : this.isSmall ? 75 : 15;
            this.isOptionButtonShown = true;
          });
              
         },
         (error)=>console.log('_scroller error', error),
         ()=>console.log('_scroller completed..')
    );

  }

  initObservable() {
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach((entry: IntersectionObserverEntry)=>{
        if(entry.isIntersecting) {
          this.initCardInfoAndModalOpen();
          obs.disconnect();
          obs.unobserve(this.modelList.nativeElement);
        }
      })
    })
    obs.observe(this.modelList.nativeElement);
  }




  filterClear() { 
    this.mnSrv.clearFilterGroup();
  }

  filterDialogOpen() {
    this.matDialog.open(MaszynyNoweFilterComponent, {
      minWidth: `${this.drawerWidth()}vw`,
      minHeight: `${this.drawerWidth()}vh`,
    }).afterClosed()
    .subscribe(
         (_filterDialog:any)=>{
              
         },
         (error)=>console.log('_filterDialog error', error),
         ()=>console.log('_filterDialog completed..')
    );

  }

  drawerMode(): string {
    return this.isSmall ? 'over' : 'side';
  }

  drawerClose(){
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  
  drawerWidth(): number {
    if(this.mqAlias == 'xs') {return 90;}
    if(this.mqAlias == 'sm') {return 70;}
    if(this.mqAlias == 'md') {return 35;}
    if(this.mqAlias == 'lg') {return 25;}
    if(this.mqAlias == 'xl') {return 20;}
  }

  modelSpecCardInfoShow() {
    this.mnSrv.isModelSpecCardInfo.setValue(!this.mnSrv.isModelSpecCardInfo.value);
  }



  get filterGroup$(): FormGroup {
    return <FormGroup>this.mnSrv.filterForm$;
  }




}

