import { Injectable, ElementRef } from '@angular/core';
import { ISvgViewBox } from './interfaces/i-svg-viewbox';
import { ISVGPoint } from './interfaces/i-svg-point';
import { ISVGVector } from './interfaces/i-svg-vector';

@Injectable({
  providedIn: 'root'
})
export class SvgCommonFunctionsService {

  constructor() { }

  getUniqeId(pre?: string) {
    return Math.random().toString().replace(',', '');
  }
  getViewBoxSize(viewBox: string): ISvgViewBox {
    if (this.isViewBoxFormat(viewBox)) {
      return this.convertToViewBoxObject(viewBox);
    }
    return;
  }
  isViewBoxFormat(viewBox: string): boolean {
    const res = false;
    const vb: ISvgViewBox = <ISvgViewBox>{};
    const viewBoxArr = viewBox.split(' ');
    //
    // check if has 3 spaces (0 0 1920 1080)
    //
    if (viewBoxArr.length < 3) { return false; }
    return true;
  }
  convertToViewBoxObject(viewBox: string): ISvgViewBox {
    const res: ISvgViewBox = <ISvgViewBox>{ point: <ISVGPoint>{} };
    const viewBoxArr = viewBox.split(' ');
    res.point.x = Number(viewBoxArr[0]);
    res.point.y = Number(viewBoxArr[1]);
    res.width = Number(viewBoxArr[2]);
    res.height = Number(viewBoxArr[3]);
    //
    // check if last two are numbers
    //
    return res;
  }
  translateSVGPoints(svg: SVGSVGElement, point: ISVGPoint): DOMPoint {
    const pt = svg.createSVGPoint();
    pt.x = point.x;
    pt.y = point.y;
    //pt.z = point.z;
    const res = pt.matrixTransform(svg.getScreenCTM().inverse());
    return res;
  }
  getHTMLNativeElementMiddlePoint(el: ElementRef): ISVGPoint {
    const box = (<HTMLElement>el.nativeElement).getBoundingClientRect();
    return <ISVGPoint>{
      x: box.left + (box.width / 2),
      y: box.top + (box.height / 2)
    }
  }
  getHTMLNativeElementMiddlePointVector(el: ElementRef): ISVGPoint {
    const box = (<HTMLElement>el.nativeElement).getBoundingClientRect();
    const boxMiddle = this.getHTMLNativeElementMiddlePoint(el);
    return <ISVGPoint>{
      x: boxMiddle.x - box.left,
      y: boxMiddle.y - box.top
    }
  }
  getPositionsVector(p0: ISVGPoint, p1: ISVGPoint): ISVGVector {
    return <ISVGVector>{
      x: p1.x - p0.x,
      y: p1.y - p0.y
    }
  }
  movePointByVector(point: ISVGPoint, vector: ISVGVector, isNegative?: boolean): ISVGPoint {
    return <ISVGPoint>{
      x: isNegative ? point.x - vector.x : point.x + vector.x,
      y: isNegative ? point.y - vector.y : point.y + vector.y
    }
  }
  mathRootAndRound(num: number): number {
    if (num == 0) { return 0 };
    if (num > 0) { return Math.round(Math.sqrt(num)); }
    if (num < 0) {
      return Math.round(Math.sqrt(Math.abs(num)) * -1);
    }
  }


  shrinkVector(vector: ISVGVector, divideBy?: number): ISVGVector {
    return <ISVGVector>{
      x: divideBy ? vector.x / divideBy : this.mathRootAndRound(vector.x),
      y: divideBy ? vector.y / divideBy : this.mathRootAndRound(vector.y)
    }
  }

  updateSVGViewBoxPosition(svgContainer: SVGSVGElement, followPosition: ISVGPoint, lastMousePosition: ISVGPoint, _mousePoint?: ISVGPoint, ancorPointRectElement?: ElementRef, easeDivideBy?: number) {
    //
    // if no mousePosition and lastMousePosition has init - NEGATIVE values then return.. 
    //
    if ((lastMousePosition.x < 0 || lastMousePosition.y < 0) && !_mousePoint) { return; }
    if (!_mousePoint && lastMousePosition.x >= 0 && lastMousePosition.y >= 0) {
      //
      // if no mousePoit position, set last one.. 
      // if has, update lastMouseposition value to current..
      //
      _mousePoint = <ISVGPoint>{};
      _mousePoint.x = lastMousePosition.x;
      _mousePoint.y = lastMousePosition.y || 0;
    } else {
      lastMousePosition.x = _mousePoint.x;
      lastMousePosition.y = _mousePoint.y;
    }
    //
    // translate mouse position to svg viewBox
    // if ancorpoint is set, move by middlepoint vector
    //
    const mousePosOnViewBox = this.translateSVGPoints(svgContainer, ancorPointRectElement
      ? this.movePointByVector(_mousePoint, this.getHTMLNativeElementMiddlePointVector(ancorPointRectElement), true)
      : _mousePoint);
    let v1 = this.getPositionsVector(followPosition, mousePosOnViewBox);
    //
    // make ease by shrinking vector - lenght betwwen element and mouse point
    // calc math round and root... 
    //
    v1 = this.shrinkVector(v1, easeDivideBy);
    //
    // move only if vector diff is more then 1px on ViewBox..
    //
    if (Math.abs(v1.x) > 1 || Math.abs(v1.y) > 1) {
      const movedByV1 = this.movePointByVector(followPosition, v1);
      followPosition.x = movedByV1.x;
      followPosition.y = movedByV1.y;
    }
  }

}
