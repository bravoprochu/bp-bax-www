import { Directive, OnInit, ElementRef, HostListener } from '@angular/core';
import { AnimationBuilder, style, animate, trigger, transition, state, AnimationPlayer, query } from '@angular/animations';

@Directive({
  selector: '[fillChange]'
})
export class FillChangeDirective implements OnInit {
  player: AnimationPlayer;
  playerBig: AnimationPlayer;
  playIt: string = "leave";

  constructor(
    private el: ElementRef,
    private _builder: AnimationBuilder
    ) {}
 
  
  makeItSmall(element: any) {
    // first define a reusable animation
    const myAnimation = this._builder.build([
      query('circle', [
        style({r: '*'}),
        animate(1000, style({
          r:14, fill: 'white'
        }))
      ], {limit: 1})
    ]);
      // use the returned factory object to create a player
    this.player = myAnimation.create(element);
    this.player.onStart(() => {
      console.log('anim started...');
    })
    // this.player.play();
  }

  makeItBig(element: any) {
    // first define a reusable animation
    const myAnimation = this._builder.build([
      query('circle', [
        style({r: '*'}),
        animate(2000, style({
          r:17, fill: 'blue'
        }))
      ], {limit: 1})
    ]);
      // use the returned factory object to create a player
    this.playerBig = myAnimation.create(element);
    //this.playerBig.play();
  }


  animIt(){
    const b = this._builder.build(
      trigger('playIt', [
        state('over', style({
          r:'15'
        })),
        state('leave', style({
          r:'5'
        })),
        transition('over<=>leave', [
          animate(1500)
        ])
      ])
    )
  }



  ngOnInit(): void {
     this.makeItSmall(this.el.nativeElement);
     this.makeItBig(this.el.nativeElement);
    // this.animIt();
  }

  @HostListener('mouseover') onMouseEnter() {
     console.log('onOver... playBig');
    // console.log('totalTime small', this.player.totalTime); 
    this.player.onDone(()=>{
      console.log('dooone');
    })
    this.playerBig.play();

  }
  @HostListener('mouseleave') onMouseLeave() {
     console.log('onLeave... playSmall');
    // this.playerBig.reset();
    // console.log('totalTime big', this.playerBig.totalTime); 
    //this.playerBig.reset();
    this.player.play();
  }

  @HostListener('mousemove') onmousemove(){
    console.log('mouseMove', 'playerPos: ', this.playerBig.beforeDestroy);
  }
}
