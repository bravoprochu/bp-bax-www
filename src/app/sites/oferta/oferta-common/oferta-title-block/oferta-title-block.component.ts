import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-oferta-title-block',
  templateUrl: './oferta-title-block.component.html',
  styleUrls: ['./oferta-title-block.component.css']
})
export class OfertaTitleBlockComponent implements OnInit {
  @Input('title') title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
