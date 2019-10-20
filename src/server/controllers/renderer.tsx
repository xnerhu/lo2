import { Router } from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import { StoreProvider } from '~/renderer/app/store';
import { IAppState } from '~/interfaces';
import { Html } from '../components/HTML';
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
    ]
  }

  const content = renderToString(
    <StaticRouter location={req.baseUrl} context={routerContext}>
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
