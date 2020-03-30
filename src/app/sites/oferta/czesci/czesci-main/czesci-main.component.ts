import { Component, OnInit } from '@angular/core';
import { CardPersonService } from 'src/app/otherModules/card-person/card-person.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { ICardPerson } from 'src/app/otherModules/card-person/interfaces/i-card-person';
import { takeUntil } from 'rxjs/operators';
import { bp_braakpointsAll, bp_braakpointsSmall, bp_braakpointsPortrait } from '@sharedConst/bp_breakpoints';

@Component({
  selector: 'app-czesci-main',
  templateUrl: './czesci-main.component.html',
  styleUrls: ['./czesci-main.component.css']
})
export class CzesciMainComponent implements OnInit {

  constructor(
    private cardPersonService: CardPersonService,
    private breakpointObs: BreakpointObserver
  ) { }

  isDestroyed$: Subject<boolean> = new Subject()
  cssMainTextCols: string;
  contactCards: ICardPerson[];

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
    this.isDestroyed$.unsubscribe();
  }

  ngOnInit() {
    this.breakpointObs.observe(bp_braakpointsAll()).pipe(
      takeUntil(this.isDestroyed$)
    )
      .subscribe(
        (_breakpObs: any) => {
          this.cssMainTextCols = 'oferta-main-text-col-2';
          if (this.breakpointObs.isMatched(bp_braakpointsSmall())) {
            this.cssMainTextCols = this.breakpointObs.isMatched(bp_braakpointsPortrait()) ? '' : 'oferta-main-text-col-2'
          }
        },
        (error) => console.log('_breakpObs error', error),
        () => console.log('_breakpObs completed..')
      );

    


    this.contactCards = [];
    this.contactCards.push(this.cardPersonService.getDelaerByName('bereźnicki'));

    }

}
