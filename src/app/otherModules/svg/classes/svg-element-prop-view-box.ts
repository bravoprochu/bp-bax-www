import { ISvgViewBox } from '../interfaces/i-svg-viewbox';
import { ISVGPoint } from '../interfaces/i-svg-point';

export class SVGElementPropViewBox implements ISvgViewBox {
    height: number = 1080;
    point: ISVGPoint = <ISVGPoint> {
          x: 0,
          y: 0
        };
    width: number = 1920;
    constructor() {
                
    }
    copyFrom(src: ISvgViewBox) {
        this.height = src.height;
        this.width = src.width;
        this.point = Object.assign(this.point, src.point);
    }
    middlePoint():ISVGPoint {
        return <ISVGPoint> {
            x: this.width/2,
            y: this.height/2
        }
    }
    toString() {
        return `${this.point.x} ${this.point.y} ${this.width} ${this.height}`;
    }
}