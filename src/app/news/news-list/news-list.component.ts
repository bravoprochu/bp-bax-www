import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const intersection = new IntersectionObserver((entries=>{
      console.log(entries);
    }), {threshold: 1})


    intersection.observe(document.querySelector('#infiniti-scroll-trigger'));

  }

}
