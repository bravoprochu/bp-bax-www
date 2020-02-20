import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title-block',
  templateUrl: './title-block.component.html',
  styleUrls: ['./title-block.component.css']
})
export class TitleBlockComponent implements OnInit {
@Input('title') title: string;

  constructor() { }

  ngOnInit() {
  }

}
