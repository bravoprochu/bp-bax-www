import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges, Host, HostListener, OnDestroy } from '@angular/core';
import { BP_ANIM_SVG_INIT } from 'src/app/animations/bp_anim_svg-init';
import { bp_anim_svg_init_fromBottom } from 'src/app/animations/bp_anim_svg-init_from_bottom';
import { NewsService } from 'src/app/news/news.service';
import { Router } from '@angular/router';
import { INewsArticle } from 'src/app/news/interfaces/i-news-article';
import { ISVGIconsList } from '../../article-container/interfaces/i-svg-icons-list';
import { fromEvent, Subject, of } from 'rxjs';
import { NewsArticleComponent } from 'src/app/news/news-article/news-article.component';
import { startWith, takeUntil, switchMap, map } from 'rxjs/operators';
import { CommonFunctionsService } from '../../common-functions.service';
import { ViewportScroller } from '@angular/common';
import { IWindowBasicInfo } from '../interfaces/i-window-basic-info';
import { BP_ANIM_GROUP_APPEARING } from 'src/app/animations/bp_anim_group_appearing';



@Component({
  selector: 'app-article-navigation',
  templateUrl: './article-navigation.component.html',
  styleUrls: ['./article-navigation.component.css'],
  animations: [
    BP_ANIM_SVG_INIT(200, 100, 'svg'),
    BP_ANIM_GROUP_APPEARING(200, 1550, 'g')
  ]
})
export class ArticleNavigationComponent implements OnInit, OnChanges, OnDestroy {
  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
    this.isDestroyed$.unsubscribe();
  }
  @Host() host: NewsArticleComponent;
  @Input('data') data: INewsArticle;

  iconHome: string = 'home';
  iconList: string = 'list';
  iconNext: string = 'next';
  iconPrev: string = 'prev';
  iconGoTop: string = 'goTop';
  iconFingerprint: string = 'fingerprint';

  isDestroyed$: Subject<boolean> = new Subject();
  isMenuOpen: boolean = true;

  svgElements: ISVGIconsList[] = [];
  svgElementsCopy: ISVGIconsList[] = [];
  svgViewBox: string = '0 0 100 400';


  constructor(
    public cf: CommonFunctionsService,
    public ns: NewsService,
    private router: Router,
    private viewPortScroller: ViewportScroller

  ) { }

  ngOnInit() {

    this.svgElements = [
      // { name: this.iconGoTop, info: 'scroll TOP' },
      { name: this.iconNext, info: 'Następny' },
      { name: this.iconPrev, info: 'Poprzedni' },
      { name: this.iconList, info: 'Wróć do listy' },
      { name: this.iconHome, info: 'strona główna' },
      { name: this.iconFingerprint, info: 'ukryj' }
    ];


    this.cf.getWindowBasicInfo$(this.isDestroyed$)
      .subscribe(
        (_windowInfo: IWindowBasicInfo) => {
          if(!this.isMenuOpen) {return;}
          
          if(_windowInfo.scrollY >= (_windowInfo.isPortrait? _windowInfo.height/2 : _windowInfo.width /2)) {
            if(!this.checkIfIconOnList(this.iconGoTop)){
              this.svgElements.unshift({name: this.iconGoTop});
              this.getSVGViewBox();
            }
          } else {
            if(this.checkIfIconOnList(this.iconGoTop)){
              this.svgElements.splice(this.getIconIndex(this.iconGoTop), 1);
              this.getSVGViewBox();
            }
          }
        },
        (err) => console.log('windowBasicInfo error', err),
        () => console.log('windowBasicInfo finish..')
      )
    
    this.checkButtonsList();
  }



  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue) {
      this.checkButtonsList();
    }
  }

  goTo(el: ISVGIconsList) {
    switch (el.name) {
      case this.iconHome:
        this.router.navigateByUrl('/');
        break;

      case this.iconNext:
        this.goNext()
        break;

      case this.iconPrev:
        this.goPrev()
        break;

      case this.iconGoTop:
        this.goTop();
        break;

      case this.iconList:
        this.router.navigateByUrl('/news');
        break;

      case this.iconFingerprint:
        if(this.isMenuOpen) {
          Object.assign(this.svgElementsCopy, this.svgElements);
          this.svgElements.splice(0, this.svgElements.length-1);
        } else {
          Object.assign(this.svgElements, this.svgElementsCopy);
        }
        this.isMenuOpen = !this.isMenuOpen;
        this.getSVGViewBox();
        break;

      default:
        break;
    }
  }

  private checkButtonsList() {
    this.checkIfNext();
    this.checkIfPrev();
    //this.checkIfGoTop();
    this.getSVGViewBox();
  }

  private checkIfIconOnList(elName: string): ISVGIconsList {
    const res = this.svgElements.find(f => f.name == elName);
    return res;
  }

  checkIfNext() {
    if (this.ns.isNext(this.data)) {
      if (!this.checkIfIconOnList(this.iconNext)) {
        this.svgElements.splice(this.getIconIndex(this.iconList) - 1, 0, { name: this.iconNext });
      }
    } else {
      if (this.checkIfIconOnList(this.iconNext)) {
        this.svgElements.splice(this.getIconIndex(this.iconNext), 1);
      }
    }
  }

  checkIfPrev() {
    if (this.ns.isPrev(this.data)) {
      if (!this.checkIfIconOnList(this.iconPrev)) {
        this.svgElements.splice(this.getIconIndex(this.iconNext) + 1, 0, { name: this.iconPrev });
      }
    } else {
      if (this.checkIfIconOnList(this.iconPrev)) {
        this.svgElements.splice(this.getIconIndex(this.iconPrev), 1);
      }
    }
  }

  checkIfGoTop() {
    const windowInfo = this.cf.windowBasicInfo;
  }


  getIconIndex(iconName: string): number {
    const icon = this.svgElements.find(f => f.name == iconName);
    return icon ? this.svgElements.indexOf(icon) : -1
  }

  goNext() {
    this.router.navigateByUrl(`/news/${this.ns.getNext(this.data).id}`);
  }

  goPrev() {
    this.router.navigateByUrl(`/news/${this.ns.getPrev(this.data).id}`);
  }



  goTop() {
    this.viewPortScroller.scrollToPosition([0, 0]);
  }


  // isNext():boolean {
  //   return this.news.indexOf(this.data)>= 0 && this.news.indexOf(this.data) < this.news.length-1;
  // }


  openMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getSVGViewBox() {
    this.svgViewBox = `0 0 100 ${this.svgElements.length * 100}`;
  }


}
