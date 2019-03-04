import { Component, OnInit, Input } from '@angular/core';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import { IBaxModelMaszynaNowa } from '../../interfaces/i-bax-model-maszyna-nowa';


@Component({
  selector: 'app-model-maszyny-first',
  templateUrl: './model-maszyny-first.component.html',
  styleUrls: ['./model-maszyny-first.component.css']
})
export class ModelMaszynyFirstComponent implements OnInit {
  @Input('model') model: IBaxModelMaszynaNowa;
  fillId: string;

  constructor(
    public cf: CommonFunctionsService,
    
  ) { }

  ngOnInit() {
    this.fillId = this.cf.getUniqueId('fillId');
  }

}
