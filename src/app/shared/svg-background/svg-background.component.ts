import { Component, OnInit, Input } from '@angular/core';
import { IPantoneToHex } from 'src/app/pantoneToHex/interfaces/i-pantone-to-hex';
import { PantoneToHexService } from 'src/app/pantoneToHex/pantone-to-hex.service';

@Component({
  selector: 'app-svg-background',
  templateUrl: './svg-background.component.svg',
  styleUrls: ['./svg-background.component.css']
})
export class SvgBackgroundComponent implements OnInit {
  @Input("colors") colors: IPantoneToHex[];
  public posArr: string[];

  constructor(
    private pantoneService: PantoneToHexService
  ) { }

  ngOnInit() {
    this.posArr = [
      '50',
      '40',
      '30',
      '20',
      '10',
      '0'
    ]
    console.log(this.colors);
  }

}
