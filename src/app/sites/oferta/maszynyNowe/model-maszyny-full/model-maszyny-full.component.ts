import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaszynyNoweService } from '../maszynyNoweServices/maszyny-nowe.service';
import { IBaxModel } from '../../interfaces/i-bax-model';
import { IBaxModelMaszynaNowa } from '../../interfaces/i-bax-model-maszyna-nowa';
import { IBaxModelSpecGroup } from '../../interfaces/i-bax-model-spec-group';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';

@Component({
  selector: 'app-model-maszyny-full',
  templateUrl: './model-maszyny-full.component.html',
  styleUrls: ['./model-maszyny-full.component.css']
})
export class ModelMaszynyFullComponent implements OnInit {
  model: IBaxModelMaszynaNowa
  specGroups: IBaxModelSpecGroup[];
  linkToShare: string;
  constructor(
    private actRoute: ActivatedRoute,
    private mnSrv: MaszynyNoweService,
    private cf: CommonFunctionsService
  ) { }

  ngOnInit() {
    this.initRoute()
  }


  initRoute(){
    const d = this.actRoute.snapshot.data['data'];
    this.linkToShare = window.location.href;
    this.model = d; 
    this.specGroups = this.mnSrv.getModelLineGroup(this.model, null);
    
    const _title = `${this.model.marka} - ${this.model.nazwaModelu}`
    this.cf.metaTitleUpdate(_title);
    
    this.cf.metaDescriptionUpdate(`Firma BAX jest autoryzowanym przedstawicielem marki ${this.model.marka}. Przedstawiamy model ${this.model.nazwaModelu} o mocy ${this.model.silnikMoc_KW} KW`);
    this.cf.metaOpenGraphProductTag(_title, window.location.href, `${window.location.origin}${(<string>this.model.mediaCardImg).replace('.','')}`);
  }

}
