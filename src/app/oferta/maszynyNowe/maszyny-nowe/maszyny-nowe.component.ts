import { Component, OnInit } from '@angular/core';
import { IBaxModelMaszynyNoweFilterLine } from '../../interfaces/i-bax-model-maszyny-nowe-filter-line';
import { PantoneToHexService } from 'src/app/pantoneToHex/pantone-to-hex.service';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { bp_anim_pulseText } from 'src/app/animations/bp_anim_pulse-text';
import { DomSanitizer } from '@angular/platform-browser';
import { MaszynyNoweService } from '../maszyny-nowe.service';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-maszyny-nowe',
  templateUrl: './maszyny-nowe.component.html',
  styleUrls: ['./maszyny-nowe.component.css'],
  animations: [
    bp_anim_pulseText()
  ]
})
export class MaszynyNoweComponent implements OnInit {
  colorEven: string;
  colorOdd: string;
  filterData: IBaxModelMaszynyNoweFilterLine[] = [];
  filterForm$: FormGroup;
  searchPhrase$: FormControl= new FormControl('whaaat ?');



    
  isLengthCount: boolean = true;
  rFiltersList$: FormArray;
  
  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
    this.isDestroyed$.unsubscribe();
  }


  isDestroyed$: Subject<boolean> = new Subject();


  constructor(
    private fb: FormBuilder,
    public mnSrv: MaszynyNoweService,
    private cf: CommonFunctionsService,
    private pantoSrv: PantoneToHexService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.rFiltersList$ = this.fb.array([]);
    const colorPalete = this.pantoSrv.getNextPaletteColors("283", 2, 1);
    const opacity = 0.25;
    this.colorEven = this.pantoSrv.colorToRGBA(colorPalete[0], opacity);
    this.colorOdd = this.pantoSrv.colorToRGBA(colorPalete[1], opacity);
  }

  filterClear() { 
    this.mnSrv.clearFilterGroup$();
  }

  drawerMode(): string {
    return (this.cf.isViewXs() || this.cf.isViewSm()) ? 'over' : 'side';
  }
  
  drawerWidth(): number {
    if(this.cf.isViewXs()) {return 90;}
    if(this.cf.isViewSm()) {return 70;}
    if(this.cf.isViewMd()) {return 35;}
    if(this.cf.isViewLg()) {return 25;}
    if(this.cf.isViewXl()) {return 20;}
  }

  modelSpecCardInfoShow() {
    this.mnSrv.isModelSpecCardInfo.setValue(!this.mnSrv.isModelSpecCardInfo.value);
  }

  get filterGroup$(): FormGroup {
    return <FormGroup>this.mnSrv.filterGroup$;
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



}

