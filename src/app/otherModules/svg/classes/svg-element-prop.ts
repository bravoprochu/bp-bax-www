import { ISVGPoint } from '../interfaces/i-svg-point';
import { ISVGSize } from '../interfaces/i-svg-size';
import { SVGElementPropViewBox } from './svg-element-prop-view-box';
import { ISVGVector } from '../interfaces/i-svg-vector';
import { IAnimationSteps } from './i-animation-steps';


export class SVGElementProp {
    anchorPoint: ISVGPoint = <ISVGPoint> {x: 0, y: 0}
    elementOffset: ISVGPoint = <ISVGPoint>{};
    isOffset: boolean = false;
    pos: ISVGPoint = <ISVGPoint>{
        x: 0,
        y: 0
    };
    svgElement: SVGSVGElement;
    size: ISVGSize = <ISVGSize>{
        height: 1080,
        width: 1920
    };
    viewBox: SVGElementPropViewBox;
    /**
     *
     */
    constructor() {
        this.viewBox = new SVGElementPropViewBox();
    }

    private convertMouseEvToSvgPoint(_mouseEv: MouseEvent): ISVGPoint {
        return <ISVGPoint>{
            x: _mouseEv.clientX,
            y: _mouseEv.clientY,
        }
    }

    currentPosFromMiddlePointOffset(): ISVGVector {
        return <ISVGVector>{
            x: Math.abs(this.viewBox.middlePoint().x - (this.isOffset ? (this.movePointByVector(this.pos, this.elementOffset).x) : this.pos.x)),
            y: Math.abs(this.viewBox.middlePoint().y - (this.isOffset ? (this.movePointByVector(this.pos, this.elementOffset).y) : this.pos.y)),
        }
    }

    getCenterPositionByPercent(percentOfSize: number): ISVGPoint {
        return <ISVGPoint>{
            x: (this.viewBox.width - (this.viewBox.width*percentOfSize))/2, 
            y: (this.viewBox.height - (this.viewBox.height*percentOfSize))/2
        }
    }

    private getPositionsVector(p0: ISVGPoint, p1: ISVGPoint): ISVGVector {
        return <ISVGVector>{
            x: p1.x - p0.x,
            y: p1.y - p0.y
        }
    }

    private movePointByVector(point: ISVGPoint, vector: ISVGVector, isNegative?: boolean): ISVGPoint {
        return <ISVGPoint>{
            x: isNegative ? Math.round(point.x - vector.x) : Math.round(point.x + vector.x),
            y: isNegative ? Math.round(point.y - vector.y) : Math.round(point.y + vector.y)
        }
    }

    private mathRootAndRound(num: number): number {
        if (num == 0) { return 0 };
        if (num > 0) { return Math.round(Math.sqrt(num)); }
        if (num < 0) {
            return Math.round(Math.sqrt(Math.abs(num)) * -1);
        }
    }

    moveToMousePosition(animSteps: IAnimationSteps) {
        if (!this.svgElement || !animSteps) { return; }
        const mousePos = this.translateSVGPoints(this.svgElement, this.convertMouseEvToSvgPoint(animSteps.mouseEvent));
        this.pos = this.isOffset ? this.movePointByVector(mousePos, this.elementOffset, true) : mousePos;
    }

    moveToMousePositionWithDelay(animSteps: IAnimationSteps) {
        if (!this.svgElement || !animSteps) { return; }
        let mousePos = <ISVGPoint>this.translateSVGPoints(this.svgElement, this.convertMouseEvToSvgPoint(animSteps.mouseEvent));
        let vector = this.getPositionsVector((this.isOffset ? (this.movePointByVector(this.pos, this.elementOffset)) : this.pos), mousePos);
        console.log('vector before: ', vector);

        const stepsRatio = 1 / (animSteps.stepsCount - animSteps.step);
        vector = this.shrinkVector(vector, stepsRatio);
        console.log('vector: ', vector, 'ratio:', stepsRatio, 'animSteps', animSteps, 'pos: ', this.pos);
        this.pos = this.movePointByVector(this.pos, vector);
    }

    moveHorizontally(animSteps: IAnimationSteps, percentOfVAriation?: number) {
        if (!this.svgElement || !animSteps || this.viewBox.middlePoint().x == 0 || this.viewBox.middlePoint().y == 0) { return; }
        const mousePoint = this.translateSVGPoints(this.svgElement, this.convertMouseEvToSvgPoint(animSteps.mouseEvent));
        const middle = this.viewBox.middlePoint();
        const isOnRightSide = mousePoint.x >= middle.x;
        const isOnBottomSide = mousePoint.y >= middle.y;
        const elementMaxPosFromMiddle = this.shrinkVector(middle, percentOfVAriation)
        const mouseVectorAbsoluteBasedOnMiddlPoint = <ISVGVector>{
            x: Math.abs((middle.x - mousePoint.x) / middle.x), 
            y: Math.abs((middle.y - mousePoint.y) / middle.y)
         };
        const elementMaxPosFromMiddleAfterShrinkVector = <ISVGVector> {
             x: (elementMaxPosFromMiddle.x * mouseVectorAbsoluteBasedOnMiddlPoint.x),
             y: (elementMaxPosFromMiddle.y * mouseVectorAbsoluteBasedOnMiddlPoint.y)
        }

      
        const stepsRatio = 1 / (animSteps.stepsCount - animSteps.step);
        let activePosToMaxposVector = this.getPositionsVector(this.pos, elementMaxPosFromMiddleAfterShrinkVector);
        activePosToMaxposVector = this.shrinkVector(activePosToMaxposVector, stepsRatio)
        const elementMaxPos = this.movePointByVector(this.anchorPoint, elementMaxPosFromMiddleAfterShrinkVector, true);
        
        let lengthVector = this.getPositionsVector(this.pos, elementMaxPos);
        lengthVector = this.shrinkVector(lengthVector, stepsRatio);

        const pos: ISVGPoint = <ISVGPoint>{}

        if(isOnRightSide) {

            this.pos.x = this.movePointByVector(this.pos, lengthVector).x;
        } else {

            this.pos.x = this.movePointByVector(this.pos, activePosToMaxposVector).x;
        }

        if (isOnBottomSide) {
            this.pos.y = this.movePointByVector(this.pos, lengthVector).y;

        } else {
            this.pos.y = this.movePointByVector(this.pos, activePosToMaxposVector).y;
        }
    }

    setPositionAttributeByXY(src: SVGElement, x: number, y: number) {
        src.setAttribute('x', x.toString());
        src.setAttribute('y', y.toString());
    }

    setPositionAttributeByPoint(src: SVGElement, pos: ISVGPoint) {
        src.setAttribute('x', pos.x.toString());
        src.setAttribute('y', pos.y.toString());
    }

    setPositionAttributeByCenterViewBoxPercent(src: SVGElement, viewBoxPercent: number, naturalHeight=1920, naturalWidth=1080) {
        const center = this.getCenterPositionByPercent(viewBoxPercent);
        const naturalRatio = naturalWidth/naturalHeight;
        const h = this.viewBox.height * viewBoxPercent;
        const w = h * naturalRatio;
        
        src.setAttribute('x', (center.x).toString());
        src.setAttribute('y', (center.y).toString());
        src.setAttribute('width', w.toString());
        src.setAttribute('height', h.toString());
    }

    setRectBorder(src: SVGElement, strokeWidth=20, color='#0000ff', strokeOpacity=1, roundX=0, roundY=0 ){
        src.setAttribute('stroke', color);
        src.setAttribute('stroke-width', strokeWidth.toString());
        src.setAttribute('fill', "none");
        src.setAttribute('stroke-opacity', strokeOpacity.toString())
        src.setAttribute('rx', roundX.toString())
        src.setAttribute('ry', roundY.toString())
    }

    private shrinkVector(vector: ISVGVector, diffPercent?: number): ISVGVector {
        return <ISVGVector>{
            x: diffPercent ? (vector.x * diffPercent) : this.mathRootAndRound(vector.x),
            y: diffPercent ? (vector.y * diffPercent) : this.mathRootAndRound(vector.y)
        }
    }

    private translateSVGPoints(svg: SVGSVGElement, point: ISVGPoint): DOMPoint {
        const pt = svg.createSVGPoint();
        pt.x = point.x;
        pt.y = point.y;
        const res = pt.matrixTransform(svg.getScreenCTM().inverse());
        return res;
    }

    


}