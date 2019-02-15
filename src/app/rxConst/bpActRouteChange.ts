import { tap, takeUntil, map } from 'rxjs/operators';
import { empty, Subject, throwError, pipe } from 'rxjs';

export const bpActiveRouteChange$ = (isDestroyed$: Subject<boolean>, paramName: string="id") => {
    return pipe(
    takeUntil(isDestroyed$),
    map((_param)=> {
      if(_param[paramName]) {
        return _param[paramName];
      }
      throwError(`bpActRouteChang$ - no value for ${paramName}`)
    })
    )
}