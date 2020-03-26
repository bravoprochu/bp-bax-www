import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IBaxModelMaszynyNoweFilterLine } from '../../interfaces/i-bax-model-maszyny-nowe-filter-line';
import { PantoneToHexService } from 'src/app/pantoneToHex/pantone-to-hex.service';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { bp_anim_pulseText } from 'src/app/animations/bp_anim_pulse-text';
import { takeUntil } from 'rxjs/operators';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { MaszynyNoweService } from '../maszynyNoweServices/maszyny-nowe.service';
import {MatDrawer } from '@angular/material/sidenav';


@Component({
  selector: 'app-maszyny-nowe',
  templateUrl: './maszyny-nowe.component.html',
  styleUrls: ['./maszyny-nowe.component.css'],
  animations: [
    bp_anim_pulseText()
  ]
})
export class MaszynyNoweComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer', {static: true }) drawer: MatDrawer;
  

  colorEven: string;
  colorOdd: string;
  filterData: IBaxModelMaszynyNoweFilterLine[] = [];
  filterForm$: FormGroup;
  isLengthCount: boolean = true;
  isSidenavOpen: boolean = false;
  isSmall:boolean;
  mqAlias: string;

  
  
  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
    this.isDestroyed$.unsubscribe();
  }


  isDestroyed$: Subject<boolean> = new Subject();


  constructor(
    public mnSrv: MaszynyNoweService,
    private cf: CommonFunctionsService,
    private pantoSrv: PantoneToHexService,
    private mediaObserver: MediaObserver,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    const _ROUTE_PARAMS =  this.activatedRoute.snapshot.queryParams;

    const _data = this.activatedRoute.snapshot.data['data'];

    this.mnSrv.maszynyNoweListAvailable = _data;
    if(!this.mnSrv.isDataReady){
      this.mnSrv.initData(_ROUTE_PARAMS);
    }
    



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
   this.isSidenavOpen=false;
   
   setTimeout(() => {
     if(!this.isSidenavOpen) {
       this.isSidenavOpen = true;
     }
   }, 3000);
  }


  test(){
    console.log(this.mnSrv.filterForm$);
  }


  filterClear() { 
    this.mnSrv.clearFilterGroup();
  }

  drawerMode(): string {
    return this.isSmall ? 'over' : 'side';
  }

  drawerClose(){
    this.drawer.open();
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

