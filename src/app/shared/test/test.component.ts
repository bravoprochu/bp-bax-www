import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil, switchMap, tap, map } from 'rxjs/operators';
import { IMouseMovePosition } from '../article-container/interfaces/i-mouse-move-position';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, AfterViewInit {

  @ViewChild("mouseFollow", {static: true}) mouseFollow: ElementRef;
  @ViewChild('svgContainer', {static: true }) svgContainer: ElementRef;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    let rect = (<SVGRectElement>this.mouseFollow.nativeElement);
    let svg = (this.svgContainer.nativeElement);


    let mouseOver$ = fromEvent(svg, "mouseover");
    let mouseLeave$ = fromEvent(svg, "mouseleave");
    let mouseMove$ = fromEvent(svg, "mousemove").pipe(
      takeUntil(mouseLeave$),
      map((_mouseMove: MouseEvent) => {
        this.mousePos.x = _mouseMove.clientX;
        this.mousePos.y = _mouseMove.clientY;

        let pt = <SVGPoint>svg.createSVGPoint();
        pt.x = _mouseMove.offsetX;
        pt.y = _mouseMove.offsetY;

        //let svgPos = pt.matrixTransform(rect)

        return _mouseMove;
      })
    )


    let move$ = mouseOver$.pipe(
      switchMap(() => mouseMove$)
    )
      .subscribe(
        (_data: any) => {
          let rBond = rect.getBoundingClientRect();
          this.rectInfo = `rect: top: ${rBond.top}px, left: ${rBond.left}, width: ${rBond.width}`;


          
          
          
          //console.log('_move', _data);
        },
        (err) => console.log(' error', err),
        () => console.log(' finish..')
      )
  }


  mousePos: IMouseMovePosition = <IMouseMovePosition>{};
  rectInfo: string;
  circleInfo: string;



}
