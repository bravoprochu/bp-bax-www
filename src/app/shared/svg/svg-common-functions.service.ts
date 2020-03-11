import { Injectable, ElementRef, Renderer2 } from '@angular/core';
import { ISvgViewBox } from './interfaces/i-svg-viewbox';
import { ISVGPoint } from './interfaces/i-svg-point';
import { ISVGVector } from './interfaces/i-svg-vector';
import { ISVGProp } from './interfaces/i-svg-prop';
import { ISVGSize } from './interfaces/i-svg-size';

@Injectable({
  providedIn: 'root'
})
export class SvgCommonFunctionsService {

  constructor() { }



  getFullUrl(url: string) {
    return `${window.location.origin}/${url}`;
  }

  getUniqeId(prefix?: string) {
    return prefix + Math.random().toString().replace(',', "").replace('.', "");
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

  convertDOMPointsToSVGPoint(_domPoint: DOMPoint): ISVGPoint {
    return <ISVGPoint>{
      x: _domPoint.x,
      y: _domPoint.y
    }
  }

  convertMouseEvToSvgPoint(_mouseEv: MouseEvent): ISVGPoint {
    return <ISVGPoint>{
      x: _mouseEv.clientX,
      y: _mouseEv.clientY,
    }
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

  initSVGProp(res: ISVGProp) {
    res.pos = <ISVGPoint>{};
    res.size = <ISVGSize>{
      height: 1080,
      width: 1920
    };
    res.viewBoxObj = <ISvgViewBox>{
      height: 1080,
      point: <ISVGPoint>{
        x: 0,
        y: 0
      },
      width: 1920
    }
  }

  generateDefs(renderer: Renderer2): SVGDefsElement {
    return (<SVGDefsElement>renderer.createElement('defs', 'svg'));
  }

  generateImage(
    renderer: Renderer2,
    url: string = this.getFullUrl('./assets/svg/logotypy/logo_bax_signOnly.svg'),
    width: string = "1920",
    height: string = "1080",
    opacity: string = "1",
    aspectRatio: string = "xMidYMid meet"): SVGImageElement {
    let image = renderer.createElement('image', 'svg');
    renderer.setAttribute(image, 'width', width);
    renderer.setAttribute(image, 'height', height);
    renderer.setAttribute(image, 'x', '0');
    renderer.setAttribute(image, 'y', '0');
    renderer.setAttribute(image, 'preserveAspectRatio', aspectRatio);
    renderer.setAttribute(image, 'href', url);
    renderer.setAttribute(image, 'opacity', opacity);

    return image;
  }

  generateLinearGradient(renderer: Renderer2, id, x1: string = "0%", y1: string = "100%", x2: string = "100%", y2: string = "100%", spreadMethod: string = "pad"): SVGLinearGradientElement {
    let linearGradient = renderer.createElement('linearGradient', 'svg');
    renderer.setAttribute(linearGradient, 'id', id);
    renderer.setAttribute(linearGradient, 'x1', x1);
    renderer.setAttribute(linearGradient, 'x2', x2);
    renderer.setAttribute(linearGradient, 'y1', y1);
    renderer.setAttribute(linearGradient, 'y2', y2);
    renderer.setAttribute(linearGradient, 'spreadMethod', spreadMethod);

    return linearGradient
  }

  generateLinearGradientStopElement(renderer: Renderer2, offset = "0%", color: string = "white", opacity: string = "1"): SVGStopElement {
    let stopEl = renderer.createElement('stop', 'svg');
    renderer.setAttribute(stopEl, 'offset', offset);
    renderer.setAttribute(stopEl, 'stop-color', color);
    renderer.setAttribute(stopEl, 'stop-opacity', opacity);
    return stopEl;
  }


  generateRect(renderer: Renderer2, width: string = "1920", height: string = "1080", fill: string = "blue", opacity: string = "1"): SVGRectElement {
    let rect = renderer.createElement('rect', 'svg');
    renderer.setAttribute(rect, 'width', width);
    renderer.setAttribute(rect, 'height', height);
    renderer.setAttribute(rect, 'x', '0');
    renderer.setAttribute(rect, 'y', '0');
    renderer.setAttribute(rect, 'fill', fill);
    renderer.setAttribute(rect, 'opacity', opacity);

    return rect;
  }

  generateSVG(renderer: Renderer2, viewBox: string = "0 0 1920 1080", width: string = "100%", height: string = "100%"): SVGElement {
    let svg = renderer.createElement('svg', 'svg');
    renderer.setAttribute(svg, 'xmlns', 'http://www.w3.org/2000/svg');
    renderer.setAttribute(svg, 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
    renderer.setAttribute(svg, 'viewBox', viewBox);
    renderer.setAttribute(svg, 'preserveAspectRatio', 'xMidYMid meet');
    renderer.setAttribute(svg, 'width', width);
    renderer.setAttribute(svg, 'height', height);
    return svg;
  }

  generateText(
    renderer: Renderer2,
    text: string,
    fontSize: string = "100",
    fill: string,
    x: string = "25",
    y: string = "950",
    width: string = "1920",
    height: string = "1080",
  ): SVGTextElement {
    let textEl: SVGTextElement = renderer.createElement('text', 'svg');
    renderer.setAttribute(textEl, 'width', width);
    renderer.setAttribute(textEl, 'height', height);
    renderer.setAttribute(textEl, 'x', x);
    renderer.setAttribute(textEl, 'y', y);
    renderer.setAttribute(textEl, 'fill', fill);
    renderer.setAttribute(textEl, 'font-size', fontSize);
    textEl.textContent = text;
    return textEl;
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

  translateSVGPoints(svg: SVGSVGElement, point: ISVGPoint): DOMPoint {
    const pt = svg.createSVGPoint();
    pt.x = point.x;
    pt.y = point.y;
    //pt.z = point.z;
    const res = pt.matrixTransform(svg.getScreenCTM().inverse());
    return res;
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
