import { Component, OnInit, Input } from '@angular/core';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import { IBaxModelMaszynaNowa } from '../../interfaces/i-bax-model-maszyna-nowa';
import { SvgCommonFunctionsService } from 'src/app/shared/svg/svg-common-functions.service';


@Component({
  selector: 'app-model-maszyny-first',
  templateUrl: './model-maszyny-first.component.html',
  styleUrls: ['./model-maszyny-first.component.css']
})
export class ModelMaszynyFirstComponent implements OnInit {
  @Input('model') model: IBaxModelMaszynaNowa;
  
  idFill: string;
  idFillGet: string;
  idCardContourDownClipPath: string;
  idCardContourDownClipPathGet: string;


  constructor(
    // public cf: CommonFunctionsService,
    private svgCF: SvgCommonFunctionsService
    
  ) { }

  ngOnInit() {
    this.idFill = this.svgCF.getUniqeId('fill');
    this.idFillGet = this.svgCF.getSvgStyleUrlPath(this.idFill);

    this.idCardContourDownClipPath = this.svgCF.getUniqeId('clipPath');
    this.idCardContourDownClipPathGet = this.svgCF.getSvgStyleUrlPath(this.idCardContourDownClipPath);
  }

}
