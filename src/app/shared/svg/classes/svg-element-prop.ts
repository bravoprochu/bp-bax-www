import { ISVGProp } from '../interfaces/i-svg-prop';
import { ISVGPoint } from '../interfaces/i-svg-point';
import { ISvgViewBox } from '../interfaces/i-svg-viewbox';
import { ISVGSize } from '../interfaces/i-svg-size';

export class SVGElementProp implements ISVGProp {
    pos: ISVGPoint;
    svgViewBox: ISvgViewBox;
    size: ISVGSize;
    /**
     *
     */
    constructor() {
        this.pos = <ISVGPoint>{};
        this.svgViewBox = <ISvgViewBox> {point: <ISVGPoint>{}};
        this.size = <ISVGSize>{};
    }

}