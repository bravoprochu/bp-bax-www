import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteAnimationService {
  isResolvingAnimationDone$: Subject<boolean> = new Subject();
  
  constructor() { }
}
