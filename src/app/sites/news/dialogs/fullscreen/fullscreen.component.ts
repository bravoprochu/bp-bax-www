import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SvgCommonFunctionsService } from 'src/app/otherModules/svg/svg-common-functions.service';
import { svgLogoBaxSignOnly_white_Url } from 'src/app/otherModules/svg/classes/svg-bax-logo-url';
import { Subject, of, interval } from 'rxjs';
import { take, takeUntil, takeWhile, tap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.svg',
  styleUrls: ['./fullscreen.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FullscreenComponent implements OnInit, OnDestroy {

  constructor(
    private svgCF: SvgCommonFunctionsService,
    private dialogRef: MatDialogRef<FullscreenComponent>
  ) { }

  isDestroyed$: Subject<boolean> = new Subject()
  
  
  idBlur: string;
  idBlurGet: string;
  image:string;
  imageBg:string;
  imageLogoBax: string;
  circlesHor: number[] = [...Array(9).keys()];
  circlesVert: number[] = [...Array(19).keys()];
  dotSpace: number = 50;
  
  counterMax: number = 10;
  counter: number;
  
  
  
  
  ngOnDestroy(): void {
       this.isDestroyed$.next(true);
       this.isDestroyed$.complete();
       this.isDestroyed$.unsubscribe();
  }

  ngOnInit(): void {
    this.idBlur = this.svgCF.getUniqeId('blur');
    this.idBlurGet = this.svgCF.getSvgStyleUrlPathSuffix(this.idBlur, 'filter');
    this.image = this.svgCF.getOriginUrl('assets/info/koronawirus/bax_info_koronawirus_1x1_noBg.png');
    this.imageBg = this.svgCF.getOriginUrl('assets/info/koronawirus/zaraza_ludzie_w_maskach.svg');
    this.imageLogoBax = this.svgCF.getOriginUrl(svgLogoBaxSignOnly_white_Url());

    interval(1000).pipe(
      takeUntil(this.isDestroyed$),
      takeWhile(u=>u< this.counterMax),
      tap((i:number)=>{
        this.counter = this.counterMax-(i);
      })
    )
    .subscribe(
         (_interval:any)=>{

         },
         (error)=>console.log('_interval error', error),
         ()=> {
           this.close();
           console.log('_interval completed..');
         }
    );

  }


  close() {
    this.dialogRef.close();
  }

}
