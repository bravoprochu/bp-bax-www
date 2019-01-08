import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';
import { environment } from 'src/environments/environment';
import { IBrickInfo } from 'src/app/shared/article-container/interfaces/i-brick-info';
import { IBrickColors } from 'src/app/shared/article-container/interfaces/i-brick-colors';
import { BP_ANIM_BRICK_LIST } from 'src/app/shared/article-container/animation/brick-list';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  animations: [
    BP_ANIM_BRICK_LIST
  ]
})
export class OfertaComponent implements OnInit {

  ngOnInit() {
    this.initData();
  }


  title = 'bax';
  bricks: IBrickInfo[];
  staggerDelay: number = 200;
  isClicked: boolean = true;


  initData() {
    const data: IBrickInfo[] = [
      { title: 'SV 60', url: '/oferta', imageUrl: `${environment.imageFolder}/yanmar01.jpg`, colors: <IBrickColors>{ colorBg: '#1E9E46', colorGradientFrom: 'FFFF00', colorGradientTo: '1E68BD' } },
      { title: 'inny yanek', imageUrl: `${environment.imageFolder}/yanmar02.jpg`, colors: <IBrickColors>{ colorBg: '#0000FF', colorGradientFrom: '0FFF00', colorGradientTo: '1E68BD' } },
      { title: 'miasto', imageUrl: `${environment.imageFolder}/yanmar03.jpg`, colors: <IBrickColors>{ colorBg: 'pink', colorGradientFrom: 'FF0F0F', colorGradientTo: '1E68BD' } },
      { title: 'Sven Hannawald', imageUrl: `https://ocdn.eu/pulscms-transforms/1/SEBktkpTURBXy9jMWIzZTViZjY0NDdlMjAyMzE5Mzc5ODFjOWUzNTI3NC5qcGeSlQLNBOwAwsOVAgDNAvjCww`, colors: <IBrickColors>{ colorBg: 'yellow', colorGradientFrom: 'F00F0F', colorGradientTo: '1E68BE' } },
      { title: 'AFC Bournemouth', imageUrl: `https://ocdn.eu/pulscms-transforms/1/qEKktkpTURBXy83YzAzZDZmMDgwZWY1NzExNGYwOTdiYzIxMDQ2NGY5NS5qcGeSlQMAas0NSM0HeJMFzQMUzQG8`, colors: <IBrickColors>{ colorBg: 'grey', colorGradientFrom: 'F00F0F', colorGradientTo: '1E68BE' } },
      { title: 'Michelle Obama', imageUrl: `https://ocdn.eu/pulscms-transforms/1/52TktkpTURBXy81NzQ5MDMyOTE1OGI0M2Y2ODUwOGFjMWZlNTU2Mzc4Ni5qcGeSlQMAUM0MKM0G1pMFzQMUzQG8`, colors: <IBrickColors>{ colorBg: 'white', colorGradientFrom: 'F00F0F', colorGradientTo: '1E68BE' } },
    ];

    this.bricks = data;

  }

}
