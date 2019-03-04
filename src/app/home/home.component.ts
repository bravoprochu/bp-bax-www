import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation, query, group, animateChild, animate, style, stagger, state } from '@angular/animations';
import { fadeInStaggerAnimation, fadeOutStaggerAnimation } from '../animations/fade-in-stagger';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
  ]

})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    
  }

info: string[] = [
  'baxPreloader..',
  'modelList filter :increment/:decrement anim',
  'modelList filter select group, drawer width fix mediaquery, card image toggle, info svg fix (...)',
  'modelList reacitve filter works !',
  'modelList sidebar, filter, imagesOnly opt',
  'modelList - spec props, search$',
  'modelList raw spec info',
  'modelList material tab',
//  'modele-list swipe up/down; intersection, preloader',
  'f safari iOS, gradient/fill fix !!',
  'oferta/marka model card awers/rewers podstawowe dane',
  'news article gradient background based on pantone last 3 colors',
  'News article swipe right/left navigation'
];  



}
