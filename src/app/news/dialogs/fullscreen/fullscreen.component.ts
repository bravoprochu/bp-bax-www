import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SvgCommonFunctionsService } from 'src/app/shared/svg/svg-common-functions.service';
import { svgLogoBaxSignOnly_white_Url } from 'src/app/shared/svg/classes/svg-bax-logo-url';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.svg',
  styleUrls: ['./fullscreen.component.css']
})
export class FullscreenComponent implements OnInit {

  constructor(
    private svgCF: SvgCommonFunctionsService,
    private dialogRef: MatDialogRef<FullscreenComponent>
  ) { }



  image:string;
  imageBg:string;
  imageLogoBax: string;
  circlesHor: number[] = [...Array(9).keys()];
  circlesVert: number[] = [...Array(19).keys()];
  dotSpace: number = 50;


  ngOnInit(): void {
    this.image = this.svgCF.getOriginUrl('/assets/info/koronawirus/bax_info_koronawirus_1x1_noBg.png');
    this.imageBg = this.svgCF.getOriginUrl('/assets/info/koronawirus/zaraza_ludzie_w_maskach.svg');
    this.imageLogoBax = this.svgCF.getOriginUrl(svgLogoBaxSignOnly_white_Url());
  }


  close() {
    this.dialogRef.close();
  }

}
