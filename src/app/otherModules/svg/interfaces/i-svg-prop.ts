import { ISvgViewBox } from './i-svg-viewbox';
import { ISVGPoint } from './i-svg-point';
import { ISVGSize } from './i-svg-size';

export interface ISVGProp {
    pos: ISVGPoint;
    size: ISVGSize;
    viewBox(): string;
    viewBoxObj: ISvgViewBox;
}