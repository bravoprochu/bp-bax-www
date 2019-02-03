import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../oferta.service';
import { IModelSpec } from '../interfaces/i-model-spec';
import { BP_ANIM_SVG_INIT } from 'src/app/animations/bp_anim_svg-init';
import { BP_ANIM_BRICK_LIST } from 'src/app/animations/bp-anim-brick-list';
import { BP_ANIM_OPACITY_INIT } from 'src/app/animations/bp-anim-opacity-init';
import { BP_ANIM_GROUP_APPEARING } from 'src/app/animations/bp_anim_group_appearing';
import { BP_ANIM_GROUP_APPEAR_ONLY } from 'src/app/animations/bp_anim_group_appear_only';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css'],
  animations: [
    BP_ANIM_BRICK_LIST(300, 250),
  ]
})
export class ModelListComponent implements OnInit {
  baseUrl: string = window.location.href;
  isAwers: boolean = true;
  modelList: IModelSpec[] = [];
  constructor(
    private osrvc: OfertaService,
    public cf:CommonFunctionsService
  ) { }

  ngOnInit() {
    this.modelList = this.osrvc.getModelList();
  }



}
