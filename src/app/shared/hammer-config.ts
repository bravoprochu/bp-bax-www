import * as Hammer from 'hammerjs';
import { HammerGestureConfig} from '@angular/platform-browser';
import { Injectable } from '@angular/core';

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      // override hammerjs default configuration
      'swipe': { direction: Hammer.DIRECTION_HORIZONTAL  },
      'pinch': { enable: false },
      'rotate': { enable: false },
      'pin': {enable: false}
  };
}