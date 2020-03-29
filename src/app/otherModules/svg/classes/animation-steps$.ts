import { interval } from 'rxjs';
import { takeUntil, startWith, take, tap, map } from 'rxjs/operators';
import { IAnimationSteps } from './i-animation-steps';


export function animationSteps$(isDestroyed$, _mouseEv: MouseEvent, intervalTime: number, steps: number) {
  return (interval(intervalTime).pipe(
    takeUntil(isDestroyed$),
    startWith(0),
    take(steps+1)
  )
  ).pipe(
    map((counter: number) => {
      return <IAnimationSteps>{
        
        mouseEvent: _mouseEv,
        step: counter,
        stepsCount: steps
      }
    }
    ),
  );
}