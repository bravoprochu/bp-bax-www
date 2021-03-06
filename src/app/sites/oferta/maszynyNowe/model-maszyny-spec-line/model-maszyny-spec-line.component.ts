import { Component, OnInit, Input } from '@angular/core';
import { IBaxModelMaszynaNowa } from '../../interfaces/i-bax-model-maszyna-nowa';

@Component({
  selector: 'app-model-maszyny-spec-line',
  templateUrl: './model-maszyny-spec-line.component.html',
  styleUrls: ['./model-maszyny-spec-line.component.css']
})
export class ModelMaszynySpecLineComponent implements OnInit {
  @Input('model') model: IBaxModelMaszynaNowa;
  @Input('prop') prop: string;

  constructor(

  ) { }

  ngOnInit() {
    
  }

}
