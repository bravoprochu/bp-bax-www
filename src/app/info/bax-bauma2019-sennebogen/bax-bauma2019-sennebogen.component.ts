import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';

@Component({
  selector: 'app-bax-bauma2019-sennebogen',
  templateUrl: './bax-bauma2019-sennebogen.component.html',
  styleUrls: ['./bax-bauma2019-sennebogen.component.css']
})
export class BaxBauma2019SennebogenComponent implements OnInit {
  isReady: boolean;
  isBaumaImgReady: boolean;
  baumaUrl: string = './assets/info/SENNEBOGEN_green_heart_of_bauma.png';
  imgSrcUrl: string = './assets/info/bax_bauma_2019_sennebogen.png';
  prelaoderUrl: string = './assets/svg/preloaders/sennebogen-preloader.svg';

  svgPL: string = './assets/info/bax-bauma2019-sennebogen-voucher-info-PL.svg';
  svgEN: string = './assets/info/bax-bauma2019-sennebogen-voucher-info-EN.svg';
  svgDE: string = './assets/info/bax-bauma2019-sennebogen-voucher-info-DE.svg';
  
  
  // imgSrc: any;
  
  constructor(
    private sanitizer: DomSanitizer,
    public cf: CommonFunctionsService
  ) { }

  ngOnInit() {
    // this.imgSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.imgSrcUrl);
    this.initImg();
  }

  initImg(){
    // let img = new Image();
    // img.src = this.imgSrcUrl;
    // ///img.src = './assets/info/bax_bauma_2019_sennebogen.png';
    // img.onload = (ev) => {
    //   this.isReady=true;
    // }

    // let baumaImg = new Image();
    // //baumaImg.src = this.baumaUrl;
    // baumaImg.onload = (ev)=>{
    //   this.isBaumaImgReady = true;
    // }
    
  }

}
