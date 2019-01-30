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
  'news article gradient background based on pantone last 3 colors',
  'News article swipe right/left navigation'
];  



}
