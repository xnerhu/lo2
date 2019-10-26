import { Router } from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import { StoreProvider } from '~/renderer/app/store';
import { IAppState } from '~/interfaces';
import { Html } from '../components/Html';
import App from '~/renderer/app/components/App';
import { getSliderItems } from '../utils';

const router = Router();

const scripts = ['app.js', 'vendor.chunk.js'];
const sheet = new ServerStyleSheet();


router.get('*', async (req, res, next) => {
  const sliderItems = await getSliderItems();
  const routerContext = {};

  const appState: IAppState = {
    sliderItems,
    shortNews: [
      {
        _id: '0',
        title: 'Mistrzowie i Patrioci',
        content: 'Zachęcamy do udziału w konkursie "Mistrzowie i patrioci", objętym Patronatem Narodowym Prezydenta Rzeczypospolitej Polkiej Andrzeja Dudy. Do wygrania atrakcyjne nagrody w postaci sprzętu elektronicznego. Chętnych zapraszamy...',
        image: 'https://ocs-pl.oktawave.com/v1/AUTH_2887234e-384a-4873-8bc5-405211db13a2/bezprawnik/2018/11/flaga-polski-prawo.jpg',
        createdAt: new Date(2019, 9, 11),
      },
      {
        _id: '1',
        title: 'Dzień Języków Obcych',
        content: '26 września obchodziliśmy w naszej szkole Europejski Dzień Języków Obcych. Uczniowie mieli za zadanie przebrać się w kolory, elementy i gadżety wylosowanych krajów europejskich. Na przerwach słuchaliśmy europejskich piosenek...',
        image: 'http://ro.com.pl/wp-content/uploads/2016/08/je%CC%A8zyki-obce.jpg',
        createdAt: new Date(2019, 9, 7),
      },
      {
        _id: '2',
        title: 'Olimpiada Wiedzy o Prawie',
        content: 'Uczniowie zainteresowani udziałem w Olimpiadzie Wiedzy o Prawie mogą zgłaszać się u p. Piotra Zamelskiego za pośrednictwem poczty e-dziennika do 5 października. Wpisowe wynosi 5 zł (u nauczyciela).',
        image: 'https://pliki.portalsamorzadowy.pl/i/13/51/98/135198_r0_940.jpg',
        createdAt: new Date(2019, 9, 2),
      },
      {
        _id: '3',
        title: 'Ekonomia i WoG',
        content: 'Zajęcia z Ekonomii w praktyce oraz Wiedzy o gospodarce odbywają się w każdą środę na 7 i 8 godzinie lekcyjnej w czytelni oraz w czwartki na 1, 2, 3 i 4 godzinie lekcyjnej. Wszystkie zapisane osoby zapraszam.',
        image: 'https://www.flstrefa.pl/zdjecia/ekonomia-definicja.jpg',
        createdAt: new Date(2019, 8, 12),
      },
    ],
    pressItems: [
      {
        _id: '0',
        name: 'NTO',
        title: 'Marszałek Grzegorz Schetyna odwiedził swoją szkołę - II LO w Opolu',
        url: 'http://www.nto.pl/apps/pbcs.dll/article?AID=/20110307/POWIAT01/200201436',
        date: new Date(2011, 2, 7),
      },
      {
        _id: '1',
        name: 'NTO',
        title: 'Licealiści z Opola potrafią inwestować',
        url: 'http://www.nto.pl/apps/pbcs.dll/article?AID=/20110124/POWIAT01/218122034',
        date: new Date(2011, 0, 24),
      },
      {
        _id: '2',
        name: 'NTO',
        title: 'Ranking szkół ponadgimnazjalnych. Jak wypadły szkoły z Opolszczyzny',
        url: 'http://www.nto.pl/apps/pbcs.dll/article?AID=/20110112/REGION/992277114',
        date: new Date(2011, 0, 11),
      },
      {
        _id: '3',
        name: 'NTO',
        title: 'Aldona Nieczesna z Opola wygrała międzynarodowy konkurs językowy',
        url: 'http://www.nto.pl/apps/pbcs.dll/article?AID=/20090506/POWIAT01/263642729',
        date: new Date(2009, 4, 11),
      },
      {
        _id: '4',
        name: 'NTO',
        title: 'II LO w Opolu pożegnano absolwentów',
        url: 'http://www.nto.pl/apps/pbcs.dll/article?AID=/20090427/POWIAT01/760928834',
        date: new Date(2019, 3, 27),
      },
      {
        _id: '5',
        name: 'NTO',
        title: 'Opolskie Orły zostały wręczone',
        url: 'http://www.nto.pl/apps/pbcs.dll/article?AID=/20080617/POWIAT01/342212282',
        date: new Date(2008, 5, 17),
      },
      {
        _id: '6',
        name: 'NTO',
        title: 'Szukali wspomnień',
        url: 'http://www.nto.pl/apps/pbcs.dll/article?AID=/20051017/POWIAT01/110170107',
        date: new Date(2005, 9, 17),
      }
    ],
    teachersItems: [
      {
        subject: 'Dyrekcja i administracja',
        teachers: [
          'mgr Agnieszka Buganik-Pszczyńska - dyrektor',
        ]
      },
      {
        subject: 'Z-cy Dyrektora',
        teachers: [
          ['mgr Agata Smoleń', 'mailto:asmolen(małpa)lo2.opole.pl'],
          'mgr Małgorzata Podraza',
          'mgr Anna Mamok'
        ]
      },
      {
        subject: 'Główna księgowa',
        teachers: ['mgr Krystyna Malżycka']
      },
      {
        subject: 'Sekretariat',
        teachers: ['mgr Maria Kozioł - sekretarz szkoły', 'mgr Małgorzata Samborska - spec. ds. uczniów']
      },
      {
        subject: 'Kadry',
        teachers: ['mgr Aleksandra Kopytko']
      },
      {
        subject: 'Pedagog',
        teachers: ['mgr Natalia Skrocka', 'mgr Agnieszka Sosnowska']
      },
      {
        subject: 'Psycholog',
        teachers: ['mgr Joanna Meres-Soblik']
      },
      {
        subject: 'Doradca zawodowy',
        teachers: [
          'mgr inż. Ewa Michalska',
          'mgr Karina Sawulska',
        ]
      },
      {
        subject: 'Kierownik ds. gospodarczych',
        teachers: [
          'mgr Wojciech Kolasiński'
        ]
      },
      {
        subject: 'Język polski',
        teachers: [
          'mgr Agnieszka Buganik-Pszczyńska',
          'mgr Ewa Łucyszyn-Pająk',
          'mgr Joanna Nazarkiewicz',
          'mgr Halina Palińska',
          'dr Ewelina Pudełko',
          'mgr Danuta Stankiewicz',
          'mgr Grażyna Świtek',
          'mgr Jolanta Toll (profesor oświaty)',
          'mgr Marzena Zaremba',
        ]
      },
      {
        subject: 'Matematyka',
        teachers: [
          'mgr Ewa Garbaj-Kmieć',
          'mgr Barbara Guzik',
          'mgr Jolanta Guzik',
          'mgr Żaneta Iskierka',
          'mgr Ryszard Lisoń',
          'dr Beata Piecuch-Ożarska',
          'mgr Maria Romanowska (profesor oświaty)',
          'mgr Krzysztof Sobków',
          'mgr Joanna Stasch',
          'mgr Aleksandra Taskin',
          ['mgr Katarzyna Zając', 'mailto:kasia.zajac(wstaw małpę)poczta(_kropka_)fm'],
        ]
      },
      {
        subject: 'Język angielski',
        teachers: [
          'mgr Małgorzata Andruszkiewicz',
          'mgr Joanna Burdzińska-Mika',
          'mgr Joanna Fojtar',
          'mgr Katarzyna Grzyb',
          'mgr Anna Hamryszak',
          'mgr Beata Jaros',
          'mgr Andrzej Kluska',
          'mgr Bartosz Kobyłczyk',
          'mgr Katarzyna Kotlińska',
          'mgr Lidia Krysztof',
          'mgr Karolina Malik',
          'mgr Katarzyna Pawliszyn',
          'mgr Małgorzata Podraza',
          ['mgr Marzena Szadzianiec', 'http://ang.lo2.opole.pl/'],
          'mgr Małgorzata Wilczek',
          'mgr Magdalena Wolna-Rumin',
        ]
      },
      {
        subject: 'Język niemiecki',
        teachers: [
          'mgr Bożena Owczar',
          'dr Daniela Ploch',
          'mgr Karina Sawulska',
          ['dr Sonia Wacław', 'mailto:swaindok@poczta.onet.pl'],
          'mgr Karina Walecko',
          'mgr Barbara Zając-Drozdek',
        ]
      },
      {
        subject: 'Język francuski',
        teachers: [
          'mgr Justyna Grzywa-Szczepanowska',
          'mgr Aleksandra Uchnast',
          'mgr Grażyna Wąsowicz (profesor oświaty)',
        ]
      },
      {
        subject: 'Język włoski',
        teachers: [
          'mgr Joanna Szczurkowska',
        ]
      },
      {
        subject: 'Język hiszpański',
        teachers: [
          'mgr Anna Andrzejewska',
          'mgr Agnieszka Bączkowska',
          'mgr Laura Miera Ruiz',
          'mgr Anna Szeląg',
        ]
      },
      {
        subject: 'Fizyka',
        teachers: [
          'mgr Dorota Bacławska',
          'mgr Beata Kołodziej',
          ['dr inż. Grzegorz Korbaś', 'http://www.lo2.gpk.opole.pl/'],
          'mgr Anna Mamok',
        ]
      },
      {
        subject: 'Chemia',
        teachers: [
          'mgr Barbara Besztak-Tomiczak',
          'mgr Krystyna Chudzia',
          'mgr Iwona Gmoch-Buczek',
          'mgr Beata Sokół',
          'mgr Dorota Wieczorek',
        ]
      },
      {
        subject: 'Informatyka',
        teachers: [
          'mgr Ryszard Lisoń',
          'mgr Aleksandra Taskin',
          ['mgr Katarzyna Zając', 'mailto:kasia.zajac(wstaw małpę)poczta(_kropka_)fm'],
          ['mgr inż. Krzysztof Żyta', 'mailto:chrisu1(wstaw małpę)wp(_kropka_)pl'],
        ]
      },
      {
        subject: 'Historia i WOS',
        teachers: [
          'mgr Aleksander Iszczuk',
          'mgr Przemysław Jędrychowski',
          'mgr Julita Kiełbasa',
          'mgr Iwona Kozak',
          'mgr Agata Smoleń',
          'mgr Celina Tomaszewska',
          'mgr Marcin Wietrzniok',
        ]
      },
      {
        subject: 'WOS',
        teachers: [
          'mgr Karina Sawulska',
          ['dr Piotr Zamelski', 'http://www.p.zamelski.po.opole.pl/index.php/edukacja-spoleczno-prawna'],
        ]
      },
      {
        subject: 'Edukacja dla bezpieczeństwa',
        teachers: [
          'mgr Tomasz Rogoziewicz',
        ]
      },
      {
        subject: 'Podstawy przedsiębiorczości',
        teachers: [
          'mgr Lucyna Rudnik',
        ]
      },
      {
        subject: 'Geografia',
        teachers: [
          'mgr Krystyna Ozon',
          'mgr Małgorzata Kaleta',
          'mgr Jolanta Siemieniuk',
        ]
      },
      {
        subject: 'Biologia',
        teachers: [
          'mgr Katarzyna Duczmal',
          'mgr Aleksandra Kruczek',
          'mgr Magdalena Majchrowicz',
          'mgr Joanna Tokar',
        ]
      },
      {
        subject: 'Filozofia',
        teachers: [
          'mgr Renata Podolan',
        ]
      },
      {
        subject: 'Historia sztuki',
        teachers: [
          'mgr Maria Bitka',
        ]
      },
      {
        subject: 'Fotografia',
        teachers: [
          'mgr Sławoj Dubiel',
          ['mgr Katarzyna Zając', 'mailto:kasia.zajac(wstaw małpę)poczta(_kropka_)fm'],
        ]
      },
      {
        subject: 'Wychowanie fizyczne',
        teachers: [
          'mgr Adam Cichoń',
          'mgr Małgorzata Franek',
          'mgr Barbara Kaniuka',
          'mgr Anna Kucharska',
          'mgr Adam Malik',
          'mgr Ewa Mehlich',
          'mgr Mariusz Pająk',
          'mgr Barbara Rajcic',
        ]
      },
      {
        subject: 'Religia',
        teachers: [
          'ks. Jacek Drabik',
          'dr Grzegorz Filipowski',
          'mgr Joanna Jabłońska-Sobek',
          'ks. Witold Trawka',
        ]
      },
      {
        subject: 'Etyka',
        teachers: [
          'mgr Renata Podolan',
        ]
      },
      {
        subject: 'Biblioteka',
        teachers: [
          'mgr Anna Bęben',
          'mgr Joanna Danielczok',
          'mgr Renata Podolan',
          'mgr Elżbieta Sławińska',
        ]
      },
    ]
  }

  const content = renderToString(
    <StaticRouter location={req.originalUrl} context={routerContext}>
      <StyleSheetManager sheet={sheet.instance}>
        <StoreProvider data={appState}>
          <App />
        </StoreProvider>
      </StyleSheetManager>
    </StaticRouter>
  );

  const str = renderToString(
    <Html scripts={scripts} styleElement={sheet.getStyleElement()} state={appState}>
      {content}
    </Html>
  );

  res.send(`<!doctype html>${str}`);

  next();
});

export default router;
