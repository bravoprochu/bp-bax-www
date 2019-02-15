import { Injectable } from '@angular/core';
import { INewsArticle } from './interfaces/i-news-article';
import { NullTemplateVisitor } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  isAscendindSortOrder : boolean;
  isSortByDate : boolean = true;

  constructor() { }


  isNext(data: INewsArticle): boolean {
    const nextIdx = this.getArticleIdx(data) + 1;
    return this.dataJson.length - 1 >= nextIdx;
  }
  isPrev(data: INewsArticle): boolean {
    const idx = this.getArticleIdx(data);
    return idx - 1 >= 0;
  }

  findById(id: string): INewsArticle {
    return this.dataJson.find(f => f.id == id);
  }

  getArticleIdx(data: INewsArticle): number {
    return this.getNews().indexOf(this.dataJson.find(f => f.id == data.id));
  }

  getNext(data: INewsArticle): INewsArticle {
    const act = this.getArticleIdx(data);
    if (this.isNext(data)) {
      return this.dataJson[act + 1];
    }
  }

  getNews(): INewsArticle[] {
    return this.isSortByDate ? this.getNewsByDate() : this.getNewsByName();
  }

  private getNewsByDate(): INewsArticle[] {
    return this.dataJson.sort(this.sortBy('creationDate', this.isAscendindSortOrder));
  }

  private getNewsByName(): INewsArticle[] {
    return this.dataJson.sort(this.sortBy('name', this.isAscendindSortOrder));
  }

  getPrev(data: INewsArticle): INewsArticle {
    const act = this.getArticleIdx(data);
    if (this.isPrev(data)) {
      return this.dataJson[act - 1];
    }
  }

  sortBy(propName: string, isAsc: boolean) {
    return function(a: INewsArticle, b: INewsArticle) {
        if(a[propName]== undefined || b[propName] == undefined) {return }
        if(a[propName].toLocaleLowerCase() > b[propName].toLocaleLowerCase()) {
      return isAsc ? 1: -1;
    }
    if(a[propName].toLocaleLowerCase() < b[propName].toLocaleLowerCase() ) {
      return isAsc ? -1 : 1;
    }
    return 0
  }
  };




  dataJson: INewsArticle[] = [
    {
      creationDate: '2018-10-01',
      id: 'kopanie-to-nasza-pasja-weryfikacja-WY_KOP',
      title: {
        title: "Kopanie to nasza pasja",
        shortTitle: "Weryfikacja w terenie",
        subtitle: "WY-KOP Krzysztof Konieczny"
      },
      imgUrl: './assets/images/news/kopanieToNaszaPasja_Weryfikacja_WY-KOP.jpg',
      youtubeUrl: 'https://youtu.be/kxyBC86G0sk',
      youtubeEmbedUrl: 'https://www.youtube.com/embed/kxyBC86G0sk',
      text: `<p>Naszym pierszym gościem jest <strong>Krzysztof Konieczny</strong>, osoba której w branży nie trzeba przedstawiać, sprawdźcie jakimi informacjami się z nami podzielił, poznajcie jego opinie bazującą na ogromnym doświadczeniu, przekonajcie się czy warto kupić <strong>Yanmar Global.</strong></p> <p>Chcesz żebyśmy i Ciebie odwiedzili ??? Skontaktuj się z naszym dealerem <strong>Krzysztof Grodzki</strong> Sprawdźmy się w terenie ! Zapraszamy do polubienia i UDOSTĘPNIENIA tego filmu ! Czekamy na Wasze pytania, dotyczące maszyny jak i warunków jej zakupu.. Jesteśmy do Waszej dyspozycji !</p>`,
      miniInfo: {
        fill: '#f2bad8',
        imgUrl: './assets/images/news/kopanieToNaszaPasja_Weryfikacja_WY-KOP.jpg',
        pointer: '#FFC61E',
        title: 'Weryfikacja w terenie',
        url: 'kopanie-to-nasza-pasja-weryfikacja-WY_KOP',
      }
    },
    {
      creationDate: '2018-10-16',
      id: 'eRobocze-show-turek-2018',
      title: {
        title: "e-Robocze SHOW Turek 2018",
        shortTitle: "eRobocze SHOW Turek",
        subtitle: "podsumowanie"
      },
      imgUrl: './assets/images/news/eRobocze-show-turek-2018.png',
      youtubeUrl: 'https://youtu.be/IJHUXefLflQ',
      youtubeEmbedUrl: 'https://www.youtube.com/embed/mb7eg8vTyt4',
      text: `<p>Fantastyczna impreza, rewelacyjna pogoda, mnóstwo zainteresowanych, niezliczona ilość wymienionych cennych, fachowych opinii. Serdecznie, miło, piknikowo ! </p> <p>Firma BAX jest dealerem marek Yanmar Global oraz <strong>SENNEBOGEN Maschinenfabrik GmbH.</strong> Na eRobocze była też współorganizatorem jak i fundatorem głównej nagrody w konkursie BAX Sennebogen - Mistrzowski chwyt; Jeszcze raz serdecznie gratulujemy zwycięzcy p. <strong>Paweł Lipiński</strong> który z czasem 1:38min ułożył konkursowe zadanie; Na wyróżnienie zasługują również Mariusz Andrzejczak oraz Krzysztof Konieczny którzy w naszym konkursie zajęli kolejno drugie i trzecie miejsce. Jesteśmy przekonani że Operatorzy którzy w tak krótkim czasie poradzili sobie z tak wymagającym zadaniem, dają radę w każdych warunkach, na każdym modelu maszyny. Panowie, czapy z głów.</p> <p>Gościnnie przy naszym stoisku gościł <strong><em>"Kura"</em> Krzysztof Domogała</strong>, rozpoznawany jako bohater serii Złomowisko PL w firmie Olmet. Inspiruje nas ZŁOM; wyjątkowo barwna, dusza towarzystwa. Było nam niezmiernie miło Ciebie spotkać !</p> <p> Organizatorom, w szczególności <strong>Zbigniew Migda</strong> po raz kolejny należy się wielkie uznanie. Każda kolejna edycja jest coraz ciekawsza, skupiająca zainteresowanie coraz większej ilości osób. </p> <p>Jedno jest pewne: piszemy się na kolejną edycję, a Ty ?</p><p>Krótka relacja z naszej perspektywy. Byliście, widzieliście, zostawcie swój komentarz !</p>`,
      miniInfo: {
        fill: '#7c6d63',
        imgUrl: './assets/images/news/eRobocze-show-turek-2018.png',
        pointer: '#CC0256',
        title: 'e-Robocze SHOW',
        url: 'eRobocze-show-turek-2018',
      }
    },
    {
      creationDate: '2018-11-09',
      id: 'finansowanie-fabryczne-2018',
      imgUrl: './assets/images/news/finansowanie-fabryczne-2018.png',
      text: `<p>
      Z kim by nie rozmawiać, główne kryterium przy zakupie maszyny stanowi: nieustannie potrzebna - KASA… Rynek stał się
      coraz bardziej wymagający. Z roku na rok rozciągane do granic możliwości, często graniczące z cudem, normy
      wydajności stawiają operatora/właściciela firmy pod ścianą: „być albo nie być”.. Gonitwa przed terminem w parze ze
      złośliwością rzeczy martwych staje się powodem do frustracji. A może tak inaczej ?
      </p>
      <p>
      Bezspornym liderem jakości jest marka Yanmar. Jej modele charakteryzują się wysoką wydajnością i niezawodnością.
      Sloganowo ? Takie są fakty. Testy szybkości pokazują 10-40% (w zależności od specyfiki pracy) przewagę nad
      konkurencją. To oznacza że w tym samym czasie zrobią więcej albo inaczej, tą samą pracę wykonają szybciej. Jak to
      się ma do <em>„..Yanmary są drogie” ? </em> Odpowiedź jest prosta – jakość musi mieć swoją cenę. Myśląc w
      perspektywie przynajmniej 4-5 lat wybór tej marki jest gwarancją sukcesu; Na rynku wtórnym sprzęt ten traci na
      wartości stosunkowo najmniej spośród konkurencji więc można zrobić robotę – szybciej i jeszcze dobrze sprzedać maszynę.
  
  </p>
  <p>
          Prestiż Yanmar może być w zasięgu Twojego portfela ! Dzięki programowi Yanmar Finance PNB Paribas „Finansowanie fabryczne” upragniona koparka/ładowarka Yanmar może już zacząć dla Ciebie pracować po wpłacie 25% jej wartości,
          jednorazowej opłacie 500 PLN tytułem kosztów manipulacyjnych oraz pozytywnej weryfikacji bankowej która najczęściej jest tylko formalnością.
          
  </p>
      <p>
          To wyjątkowa okazja dla tych którzy planują zakup sprzętu. Masz kilkadziesiąt tysięcy i perspektywę pracy ? Nie kupuj używanego sprzętu ! Rozważasz zakup „za gotówkę” ? Może nie warto inwestować całej kwoty. Jedną z dróg do sukcesu jest zrównoważony rozwój, być może dzięki temu programowi warto skalkulować zakup jeszcze jednej maszyny ? Procedura jest wyjątkowo prosta a warunki finansowe wyjątkowo korzystne. Z doświadczenia wiemy że maszyna może zostać wydana nawet w ten sam dzień ! Standardowe dokumenty wymagane przy umowach kredytowych/leasingowych typu PIT, rejestr z KPiR i najpóźniej do 2 dni roboczych jest decyzja. Pozostała część kosztów podzielona jest na 36 rat by ostatecznie wykupić maszynę za 1% jej wartości. <strong>Uwaga raty NIE SĄ OPROCENTOWANE !!!</strong>
      </p>
  <p>
          My, firma <strong>BAX</strong> jako dobrze rozpoznawalna marka na rynku dealerskim oferujemy NAJWYŻSZEJ klasy konsultacje przy wyborze
          sprzętu jak i osprzętu. Naszą domeną potwierdzaną przez klientów jest obsługa serwisowa. Doskonale zdajemy sobie sprawę
          że maszyna musi pracować, musi zarabiać i tym samym utrzymujemy najwyższe standardy obsługi zarówno gwarancyjnej jak i
          pogwarancyjnej.
  </p>
  <p>
          Aktualnie program ten jest przewidziany do końca tego roku; Nie czekaj z decyzją, szczegółowe informacje dotyczące
          parametrów technicznych jak i finansowych – skontaktuj się z naszym brand managerem <strong>Krzysztof Grodzki <a href="tel:+48 506 000 100"> <i>506 000 100</i></a>
                  lub stacjonarnie: <a href="tel:+48 61 828 33 66"> <i>+48 61 828 33 66</i></a>)</strong>
          
  </p>
  <p>
          W ofercie posiadamy więcej modeli jednak szczególnie zachęcamy do zakupu modeli widocznych na materiale promocyjnym.
          Dostępne są od ręki!
  </p>
  <p>
          Najlepszy czas na nowego <strong>Yanmara</strong>, czekamy na Twój kontakt !
  </p>
  `,
      title: {
        shortTitle: 'Finansowanie fabryczne',
        title: 'Finansowanie fabryczne',
        subtitle: 'Yanmar 2018'
      },
      youtubeUrl: 'https://youtu.be/_7vPeRw0jqA',
      youtubeEmbedUrl: 'https://www.youtube.com/embed/_7vPeRw0jqA',
      miniInfo: {
        fill: '#2b1166',
        imgUrl: './assets/images/news/finansowanie-fabryczne-2018.png',
        pointer: '#00B2AA',
        title: 'Finansowanie Fabryczne',
        url: 'finansowanie-fabryczne-2018',
        invert: true,
      }
    },
    {
      creationDate: '2018-12-31',
      id: 'szukamy-znakow-na-niebie-sylwester-2018',
      imgUrl: './assets/images/news/szukamy-znakow-na-niebie-sylwester-2018.png',
      miniInfo: {
        fill: '#3a75c4',
        imgUrl: './assets/images/news/szukamy-znakow-na-niebie-sylwester-2018.png',
        pointer: '#0072C6',
        title: 'szukamy znaków na niebie',
        url: 'szukamy-znakow-na-niebie-sylwester-2018'
      },
      text: `<p><strong>UWAGA !!! </strong>Szukamy znaków na niebie ‼ W sylwestrową noc 🎆, punktualnie o północy, nad zachodnią częścią Polski mogą i jesteśmy przekonani że się pojawią TE znaki ‼‼‼ Daj znać jeśli je zobaczysz 🤙</p>
      <p>//jeśli nie, to najwyraźniej - należy 🍾🍷🍹..wzmóc poszukiwania !</p>
      <h1>Happy New Year 2019</h1>`,
      title: {
        shortTitle: 'Happy New Year 2019',
        title: 'Happy New Year 2019',
        subtitle: ''
      },
      youtubeUrl: 'https://youtu.be/7nRgtXfnHM4',
      youtubeEmbedUrl: 'https://www.youtube.com/embed/7nRgtXfnHM4',

    },
    {
      creationDate: '2018-12-21',
      id: 'duzo-zdrowia-i-milosci-gwiazdka-2018',
      imgUrl: './assets/images/news/duzo-zdrowia-i-milosci-gwiazdka-2018.png',
      miniInfo: {
        fill: '#ce1126',
        imgUrl: './assets/images/news/duzo-zdrowia-i-milosci-gwiazdka-2018.png',
        pointer: '#215B33',
        title: 'Gwiazdka 2018',
        url: 'duzo-zdrowia-i-milosci-gwiazdka-2018',
      },
      title: {
        shortTitle: 'dużo zdrowia i miłości',
        title: 'Dużo zdrowia i miłości',
        subtitle: 'Gwiazdka 2018'
      },
      text: `<p>Z okazji nadchodzących Świąt i Nowego Roku, życzymy naszym klientom, partnerom, współpracownikom, dużo zdrowia i miłości, nieustającej radości, dużo pozytywnej energii, rodzinnego ciepła, cudownych marzeń i powodzenia w ich realizacji.</p>
      <p>Wszystkiego dobrego !</p><h6>Music:
      Kevin MacLeod: Jingle Bells – na licencji Creative Commons Attribution (https://creativecommons.org/licenses/...)<br>
      Źródło: http://incompetech.com/music/royalty-...<br>
      Wykonawca: http://incompetech.com/</h6>`,
      youtubeUrl: 'https://youtu.be/QIT6_-IHTQQ',
      youtubeEmbedUrl: 'https://www.youtube.com/embed/QIT6_-IHTQQ'
    },
    {
      creationDate: '2018-12-08',
      id: 'wymiatamy-magazyn-czesci-case-2018',
      imgUrl: './assets/images/news/wymiatamy_magazyn_czesci_CASE_small.png',
      miniInfo: {
        fill: '#fcbf49',
        imgUrl: './assets/images/news/wymiatamy_magazyn_czesci_CASE_small.png',
        pointer: '#2D338E',
        title: 'Wymiatamy magazyn części',
        url: 'wymiatamy-magazyn-czesci-case-2018'
      },
      title: {
        shortTitle: 'wymiatamy magazyn części CASE',
        title: 'wymiatamy magazyn części CASE',
      },
      text: `<p>WYMIATAMY magazyn z części CASE ‼ Oferta ważna do wyczerpania zapasów. ☎ Zadzwoń ☎ przekonaj się że tak korzystnych cen nie znajdziesz NIGDZIE ‼</p>
      <p><strong>UWAGA ‼ EXTRA RABAT +5% ‼</strong> dla każdej osoby która zadzwoni na bezpośredni numer naszego handlowca tel. <a href="tel:+48 508 368 258"> <i>508 368 258</i></a> i powie: <em>"Miami, daj mi upust !"</em></p>`,
    },
    {
      creationDate: '2018-11-22',
      id: 'black-friday-2018',
      imgUrl: './assets/images/news/black-friday-2018.png',
      miniInfo: {
        fill: '#7c6d63',
        imgUrl: './assets/images/news/black-friday-2018.png',
        pointer: '#CC0256',
        title: 'Black friday',
        url: 'black-friday-2018',
      },
      text: `<p>📣<strong>BLACK FRIDAY w BAX</strong> 👍 💲Promocja💲 WSZYSTKIE CZĘŚCI TANIEJ O 15%, TYLKO JUTRO ‼ (23-11-2018), Zadzwoń: dział części: <a href="tel:+48 508 368 258"> <i>508 368 258</i></a> 👊</p>`,
      title: {
        shortTitle: 'Black Friday',
        title: 'Black Friday',
        subtitle: '2018'
      }
    },
    {
      creationDate: '2018-10-26',
      id: 'pol-eco-system-2018',
      imgUrl: './assets/images/news/pol-eco-system_2018.png',
      miniInfo: {
        fill: '#339e35',
        imgUrl: './assets/images/news/pol-eco-system_2018.png',
        pointer: '#5BBF21',
        title: 'POl-ECO System',
        url: 'pol-eco-system-2018',
      },
      text: `<p>Na poznańskich targach <strong>POL-ECO SYSTEM</strong> od lat mamy zarezerwowane miejsce więc Międzynarodowe Targi Ochrony Środowiska bez BAX to jak tort bez wiśienki. Byliśmy, widzieliśmy, zdobyliśmy ! Tradycja tych targów sięga już "niepamiętnych" lat, była to <em>30 - jubileuszowa</em> impreza i jak na jubileusz przystało - było na bogato ! Hektary pawilonów, setki (tysiące ?) wystawców, miliony włożone w przygotowania. Prestiż na każdym kroku ! Przez trzy dni, niezliczona ilość zwiedzających mogła z nami porozmawiać, uzyskać najnowsze informacje dotyczące wykorzystania <strong>@SENNEBOGEN Maschinenfabrik GmbH</strong> w branży recyklingowej. Z sukcesem przedstawialiśmy przygniatające argumenty dominacji zielonej marki nad konkurencją i tym samym nas, firmę BAX jako własciwego partnera przy zakupie maszyn. Serdecznie dziękujemy wszystkim odwiedzającym nasze stoisko a dla tych którzy nie mieli możliwości osobiście nas spotkać, przypominamy że jesteśmy do Waszej dyspozycji ! Zachęcamy do kontaktu za pośrednictwem social media jak i bezpośrednio w siedzibie naszej firmy.</p>`,
      title: {
        shortTitle: 'Pol-Eco System',
        title: 'Pol-Eco System 2018',
      },
      youtubeUrl: 'https://youtu.be/fHRasVqxB_E',
      youtubeEmbedUrl: 'https://www.youtube.com/embed/fHRasVqxB_E'
    },
    {
      creationDate: '2018-09-22',
      id: '75-rajd-polski',
      imgUrl: './assets/images/news/75-rajd-polski.jpg',
      miniInfo: {
        fill: '#2d338e',
        imgUrl: './assets/images/news/75-rajd-polski.jpg',
        pointer: '#FCD116',
        title: '75 Rajd Polski',
        url: '75-rajd-polski'
      },
      text: ``,
      title: {
        shortTitle: '75 Rajd Polski',
        title: '75 Rajd Polski',
        subtitle: 'Wspieramy ekipę Pieniążek Team'
      },
      youtubeUrl: 'https://youtu.be/oP3xNNaWiuo',
      youtubeEmbedUrl: 'https://www.youtube.com/embed/oP3xNNaWiuo',
      
    },
    {
      creationDate: '2018-09-16',
      id: 'mecz-bax-yanmar-team-2018',
      imgUrl: './assets/images/news/mecz-bax-yanmar-team-2018.png',
      miniInfo: {
        fill: '#009e49',
        pointer: '#96938E',
        title: 'Mecz BAX - Yanmar Team',
        url: 'mecz-bax-yanmar-team-2018',
        imgUrl: './assets/images/news/mecz-bax-yanmar-team-2018.png'
      },
      text: `<p>Serdecznie zapraszamy do kibicowania podczas meczu ekipy BAX vs "Szczęśliwi posiadacze maszyn Yanmar - Yanmar Team".</p>

      <p>O godzinie 15:15 planujemy rozegrać mecz (P)piłkarski przez duże P, na następujących zasadach:
      <ul>
      <li>czas gry: 2x30 min,</li>
      <li>Ilość zawodników: 5 + bramkarz,</li>
      <li>dowolna ilość zawodników rezerwowych,</li>
      <li>dowolna ilość zmian,</li>
      </ul>
      
      <p>Po tej, pełnej zaangażowania i przepięknych bramek, jak sądzimy, rozgrywce zapraszamy jej uczestników oraz zaproszonych gości na piknik połączony z wymianą opinii na temat zakupionych maszyn i nie tylko...</p>
      
      <p>Wszelkie osoby zainteresowane wzięciem udziału w meczu, prosimy o kontakt z: <br> <strong>Krzysztof Grodzki, tel <a href="tel:+48 506 000 100"> <i>506 000 100</i></a></strong></p>`,
      title: {
        shortTitle: 'mecz piłki nożnej',
        title: 'BAX - Yanmar Team',
      },
      youtubeUrl: 'https://youtu.be/aNaBJaW4ZQg',
      youtubeEmbedUrl: 'https://www.youtube.com/embed/aNaBJaW4ZQg'
    },
    {
      creationDate: '2019-01-29',
      id: 'yanmar-four-seasons-promotion-2019-02',
      imgUrl: './assets/images/news/BAX_Yanmar_Four_Seasons_Promotion_2019_02.png',
      miniInfo: {
        fill: '#e87511',
        imgUrl: './assets/images/news/BAX_Yanmar_Four_Seasons_Promotion_2019_02_small.png',
        pointer: '#568e14',
        title: 'Luty - Gąsienice -20%',
        url: 'yanmar-four-seasons-promotion-2019-02',
      },
      text: `<p>LUTY miesiącem (nie)OBOWIĄZKOWEJ zmiany gąsienic‼ </p> <p><strong>Skorzystaj‼ </strong> Yanmar Global Four Seasons Promotion <strong>-20 %‼</strong></p>
      <p> 🛍 <i>Kup swej "Gąsce" nowe butki...,</i>😃 </p> <p><i>..idzie luty, czas na nowe buty..... </i>‼</p>
      <p>Dział części: <strong>Krzysztof Bereźnicki</strong> aka "Miami" <a href="tel:+48 508 368 258"> <i>508 368 258</i></a></p>`,
      title: {
        shortTitle: 'short',
        subtitle: 'Luty - Gąsienice -20%',
        subtitle2: 'Yanmar Four Seasons Promotion',
        title: 'Luty - Gąsienice -20%'
      },
    },
    {
      creationDate: '2019-02-14',
      id: 'walentynki_2019',
      imgUrl: './assets/images/news/bax_walentynki_2019.png',
      miniInfo: {
        fill: '#C6AADB',
        imgUrl: './assets/images/news/bax_walentynki_2019.png',
        pointer: '#D36BC6',
        title: 'Walentynki 2019',
        url: 'walentynki_2019',
      },
      text: `<p>💖 W tym wyjątkowym dniu 💗 okażmy uczucia tym na których najbardziej nam zależy, tym dla których serce bije mocniej 💓, tym na widok których za każdym razem pojawia się uśmiech na twarzy... Drobny upominek 🎁, gest, słowo; extra usługę serwisową, akcesoria.. </p>
      <p>PS Oczywiście nie zapomnijmy o małżonkach.. im również należy złożyć życzenia.. 😜💙😁</p>`,
      title: {
        shortTitle: 'short',
        subtitle: null,
        subtitle2: null,
        title: 'Walentynki 2019'
      },
    }




  ];

}
