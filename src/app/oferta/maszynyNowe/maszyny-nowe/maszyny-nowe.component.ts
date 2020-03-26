import { Component, OnInit, AfterViewInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { IBaxModelMaszynyNoweFilterLine } from '../../interfaces/i-bax-model-maszyny-nowe-filter-line';
import { PantoneToHexService } from 'src/app/pantoneToHex/pantone-to-hex.service';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subject, of, timer } from 'rxjs';
import { bp_anim_pulseText } from 'src/app/animations/bp_anim_pulse-text';
import { takeUntil, timeout, delay, switchMap, tap } from 'rxjs/operators';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute, Params } from '@angular/router';
import { MaszynyNoweService } from '../maszynyNoweServices/maszyny-nowe.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MaszynyNoweDataFactoryService } from '../maszynyNoweServices/maszyny-nowe-data-factory.service';


@Component({
  selector: 'app-maszyny-nowe',
  templateUrl: './maszyny-nowe.component.html',
  styleUrls: ['./maszyny-nowe.component.css'],
  animations: [
    bp_anim_pulseText()
  ]
})
export class MaszynyNoweComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer', {static: false}) drawer: MatDrawer;
  @Input('queryParams') queryParams: Params;
  

  colorEven: string;
  colorOdd: string;
  filterData: IBaxModelMaszynyNoweFilterLine[] = [];
  filterForm$: FormGroup;
  isDataLoaded: boolean;
  isLengthCount: boolean = true;
  isSidenavOpen: boolean;
  isSmall:boolean;
  mqAlias: string;
  routeParams: Params;

  
  
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

  ngAfterViewInit(): void {
    of(1).pipe(
     tap(()=>{
      this.mnSrv.isModelSpecCardInfo.setValue(true);
      console.log('cardInfo to true');
     },
    ),
    delay(3000),
    tap(()=>{

      if(!this.isSidenavOpen) {
        this.isSidenavOpen = true;
      }   
    }),
    delay(2000),
    tap(()=>{
      this.mnSrv.isModelSpecCardInfo.setValue(false);
    })
   )
   .subscribe(
        (sideNavOpen_timeout$:any)=>{
             console.log('sideNavOpen_timeout$ subs:', sideNavOpen_timeout$);
             this.mnSrv.isModelSpecCardInfo.setValue(false, {emitEvent: true});
             console.log(this.mnSrv.isModelSpecCardInfo.value);
             
        },
        (error)=>console.log('sideNavOpen_timeout$ error', error),
        ()=>console.log('sideNavOpen_timeout$ completed..')
   );

   


  }



  initData() {
    // const _data = this.activatedRoute.snapshot.data['data'];
    this.df.getList()
    .subscribe(
          (_maszynyNoweAll:any)=>{
              // console.log('_maszynyNoweAll subs:', _maszynyNoweAll);
              this.mnSrv.maszynyNoweListAvailable = _maszynyNoweAll;
              
              //
              // cached filter
              //
              
              this.mnSrv.initData(this.routeParams);
              this.isDataLoaded = true;

          },
          (error)=>console.log('_maszynyNoweAll error', error),
          ()=>console.log('_maszynyNoweAll completed..')
    );
  }

  initRouteParams() {
    this.routeParams =  this.queryParams ? this.queryParams : this.activatedRoute.snapshot.queryParams;
  }


  filterClear() { 
    this.mnSrv.clearFilterGroup();
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


  get branzaList$(): FormArray {
    return <FormArray>this.mnSrv.branzaListArr$;
  }


  get markaList$(): FormArray {
    return <FormArray>this.mnSrv.markaListArr$;
  }

  get modelSearch$(): FormGroup {
    return <FormGroup>this.mnSrv.modelSearchGroup$;
    // return new FormControl();
  }

  get filterNumberSelect$() : FormControl {
    return <FormControl>this.mnSrv.filterNumberSelect$;
  }

  get filterNumberArr$(): FormArray  {
    return <FormArray>this.mnSrv.filterNumberArr$;
  }

  get zasilanieList$(): FormArray {
    return <FormArray>this.mnSrv.zasilanieListArr$;
  }





}

