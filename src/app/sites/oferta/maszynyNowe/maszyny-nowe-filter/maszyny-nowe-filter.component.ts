import { Component, OnInit } from '@angular/core';
import { MaszynyNoweService } from '../maszynyNoweServices/maszyny-nowe.service';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { bp_anim_pulseText } from 'src/app/shared/animations/bp_anim_pulse-text';

@Component({
  selector: 'app-maszyny-nowe-filter',
  templateUrl: './maszyny-nowe-filter.component.html',
  styleUrls: ['./maszyny-nowe-filter.component.css'],
  animations: [
    bp_anim_pulseText()
  ]
})
export class MaszynyNoweFilterComponent implements OnInit {

  constructor(
    public mnSrv: MaszynyNoweService
  ) { }

  ngOnInit(): void {
  }




  get branzaList$(): FormArray {
    return <FormArray>this.mnSrv.branzaListArr$;
  }

  get filterNumberSelect$() : FormControl {
    return <FormControl>this.mnSrv.filterNumberSelect$;
  }

  get filterNumberArr$(): FormArray  {
    return <FormArray>this.mnSrv.filterNumberArr$;
  }

  get markaList$(): FormArray {
    return <FormArray>this.mnSrv.markaListArr$;
  }

  get modelSearch$(): FormGroup {
    return <FormGroup>this.mnSrv.modelSearchGroup$;
  }

  get zasilanieList$(): FormArray {
    return <FormArray>this.mnSrv.zasilanieListArr$;
  }



}
