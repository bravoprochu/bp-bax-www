import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, takeWhile, tap } from 'rxjs/operators';
import { INewsArticle } from '../interfaces/i-news-article';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css']
})
export class NewsArticleComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }
  data: INewsArticle;
  isDestroyed$: Subject<boolean>;
  isReady: boolean;


  constructor(
    private cf: CommonFunctionsService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isDestroyed$ = new Subject();
    this.initObservable();
  }

  getNext() {
    const nextIdx = this.getArticleIdx() + 1;
    if(this.dataJson.length -1 >= nextIdx){
      this.router.navigateByUrl(`/news/${this.dataJson[nextIdx].id}`);
    }
  }
  
  getPrev() {
    const prevIdx = this.getArticleIdx() - 1;
    if(prevIdx >= 0){
      this.router.navigateByUrl(`/news/${this.dataJson[prevIdx].id}`);
    }
  }

  getArticleIdx(): number{
    return this.dataJson.indexOf(this.dataJson.find(f=>f.id==this.data.id));
  }

  initObservable() {
    this.actRoute.params.pipe(
      tap(()=>this.isReady = false)
    )
      .subscribe(
        (_data: any) => {
          
          this.initData(_data['id']);
        },
        (err) => console.log('actRoute error', err),
        () => console.log('actRoute finish..')
      )
  }

  isSmall(): boolean{
    return this.cf.getMediaChange().mqAlias == 'xs' ? true: false;
  }


  initData(routeId: string) {
    this.data = <INewsArticle>{};
    const d = this.dataJson.find(f => f.id == routeId);
    if (d) {
      this.data = Object.assign({}, d);
      this.data.youtubeEmbedUrl = this.data.youtubeEmbedUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(this.data.youtubeEmbedUrl) : null;
      this.data.text = d.text ? this.sanitizer.bypassSecurityTrustHtml(this.data.text) : null;
      this.isReady = true;
    }
    
  }


  dataJson: INewsArticle[] = [
    { creationDate: '2018-10-01', id: 'kopanie-to-nasza-pasja', title: { title: "Kopanie to nasza pasja", shortTitle: "Weryfikacja w terenie", subtitle: "WY-KOP Krzysztof Konieczny" }, imgUrl: 'kopanieToNaszaPasja Weryfikacja WY-KOP_resize.png', youtubeEmbedUrl: 'https://www.youtube.com/embed/kxyBC86G0sk', text: 'Naszym pierszym gościem jest <strong>Krzysztof Konieczny</strong>, osoba której w branży nie trzeba przedstawiać, sprawdźcie jakimi informacjami się z nami podzielił, poznajcie jego opinie bazującą na ogromnym doświadczeniu, przekonajcie się czy warto kupić Yanmar Global. <br>Chcesz żebyśmy i Ciebie odwiedzili ??? Skontaktuj się z naszym dealerem Krzysztof Grodzki Sprawdźmy się w terenie ! Zapraszamy do polubienia i UDOSTĘPNIENIA tego filmu ! Czekamy na Wasze pytania, dotyczące maszyny jak i warunków jej zakupu.. Jesteśmy do Waszej dyspozycji !' },
    { creationDate: '2018-10-16', id: 'eRobocze-show-turek-2018', title: { title: "e-Robocze SHOW Turek 2018", shortTitle: "eRobocze SHOW Turek", subtitle: "podsumowanie" }, imgUrl: 'eRobocze SHOW_Turek_2018_podsumowanie.jpg', youtubeEmbedUrl: 'https://www.youtube.com/embed/mb7eg8vTyt4', text: 'Fantastyczna impreza, rewelacyjna pogoda, mnóstwo zainteresowanych, niezliczona ilość wymienionych cennych, fachowych opinii. Serdecznie, miło, piknikowo ! <br> Firma BAX jest dealerem marek Yanmar Global oraz SENNEBOGEN Maschinenfabrik GmbH. Na eRobocze była też współorganizatorem jak i fundatorem głównej nagrody w konkursie BAX Sennebogen - Mistrzowski chwyt; Jeszcze raz serdecznie gratulujemy zwycięzcy p. Paweł Lipiński który z czasem 1:38min ułożył konkursowe zadanie; Na wyróżnienie zasługują również Mariusz Andrzejczak oraz Krzysztof Konieczny którzy w naszym konkursie zajęli kolejno drugie i trzecie miejsce. Jesteśmy przekonani że Operatorzy którzy w tak krótkim czasie poradzili sobie z tak wymagającym zadaniem, dają radę w każdych warunkach, na każdym modelu maszyny. Panowie, czapy z głów. <br>Gościnnie przy naszym stoisku gościł "Kura" Krzysztof Domogała, rozpoznawany jako bohater serii Złomowisko PL w firmie Olmet. Inspiruje nas ZŁOM; wyjątkowo barwna, dusza towarzystwa. Było nam niezmiernie miło Ciebie spotkać ! <br> Organizatorom, w szczególności Zbigniew Migda po raz kolejny należy się wielkie uznanie. Każda kolejna edycja jest coraz ciekawsza, skupiająca zainteresowanie coraz większej ilości osób. <br> Jedno jest pewne: piszemy się na kolejną edycję, a Ty ?<br>Krótka relacja z naszej perspektywy. Byliście, widzieliście, zostawcie swój komentarz !' }
  ];

}
