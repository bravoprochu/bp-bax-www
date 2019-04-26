import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaszynyNoweService } from '../maszynyNoweServices/maszyny-nowe.service';

@Component({
  selector: 'app-model-maszyny-full',
  templateUrl: './model-maszyny-full.component.html',
  styleUrls: ['./model-maszyny-full.component.css']
})
export class ModelMaszynyFullComponent implements OnInit {

  constructor(
    private actRoute: ActivatedRoute,
    private mnSrv: MaszynyNoweService
  ) { }

  ngOnInit() {
    this.initRoute()

  }


  initRoute(){
    
  }

}
