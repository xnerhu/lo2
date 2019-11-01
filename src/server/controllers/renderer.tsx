import { Router } from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import { StoreProvider } from '~/renderer/app/store';
import { IAppState } from '~/interfaces';
import { Html } from '../components/Html';
import App from '~/renderer/app/components/App';
import { getAppState } from '../utils';

const router = Router();

const scripts = ['app.js', 'vendor.chunk.js'];
const sheet = new ServerStyleSheet();


router.get('*', async (req, res, next) => {
  const routerContext = {};

  // const appState: IAppState = {
  //   sliderItems,

  //   pressItems: [
  //     {
  //       _id: '0',
  //       name: 'NTO',
  //       title: 'Marszałek Grzegorz Schetyna odwiedził swoją szkołę - II LO w Opolu',
  //       url: 'http://www.nto.pl/apps/pbcs.dll/article?AID=/20110307/POWIAT01/200201436',
  //       date: new Date(2011, 2, 7),
  //     },
  //     {
  //       _id: '1',
  //       name: 'NTO',
  //       title: 'Licealiści z Opola potrafią inwestować',
  //       url: 'http://www.nto.pl/apps/pbcs.dll/article?AID=/20110124/POWIAT01/218122034',
  //       date: new Date(2011, 0, 24),
  //     },
  //     {
  //       _id: '2',
  //       name: 'NTO',
  //       title: 'Ranking szkół ponadgimnazjalnych. Jak wypadły szkoły z Opolszczyzny',
  //       url: 'http://www.nto.pl/apps/pbcs.dll/article?AID=/20110112/REGION/992277114',
  //       date: new Date(2011, 0, 11),
  //     },
  //     {
  //       _id: '3',
  //       name: 'NTO',
  //       title: 'Aldona Nieczesna z Opola wygrała międzynarodowy konkurs językowy',
  //       url: 'http://www.nto.pl/apps/pbcs.dll/article?AID=/20090506/POWIAT01/263642729',
  //       date: new Date(2009, 4, 11),
  //     },
  //     {
  //       _id: '4',
  //       name: 'NTO',
  //       title: 'II LO w Opolu pożegnano absolwentów',
  //       url: 'http://www.nto.pl/apps/pbcs.dll/article?AID=/20090427/POWIAT01/760928834',
  //       date: new Date(2019, 3, 27),
  //     },
  //     {
  //       _id: '5',
  //       name: 'NTO',
  //       title: 'Opolskie Orły zostały wręczone',
  //       url: 'http://www.nto.pl/apps/pbcs.dll/article?AID=/20080617/POWIAT01/342212282',
  //       date: new Date(2008, 5, 17),
  //     },
  //     {
  //       _id: '6',
  //       name: 'NTO',
  //       title: 'Szukali wspomnień',
  //       url: 'http://www.nto.pl/apps/pbcs.dll/article?AID=/20051017/POWIAT01/110170107',
  //       date: new Date(2005, 9, 17),
  //     }
  //   ],

  //   gallery: [
  //     {
  //       label: '2019-2020',
  //       items: [
  //         {
  //           title: 'Półmetek',
  //           images: ['/static/gallery/2019-2020/Półmetek/029359_r0_1140.jpg'],
  //         },
  //         {
  //           title: 'Rozpoczęcie roku szkolnego',
  //           images: [`/static/gallery/2019-2020/${encodeURIComponent('Rozpoczęcie roku szkolnego/3258861eb51c8b3d9a2d4c5ea7dc9c01-rimg-w720-h540-gmir.jpg')}`], // encodeURIComponent
  //         }
  //       ]
  //     },
  //     {
  //       label: '2018-2019',
  //       items: [
  //         {
  //           title: 'Studniówka',
  //           images: ['/static/gallery/2018-2019/Studniówka/balowa-top-1920x1281.jpg'],
  //         },
  //       ]
  //     }
  //   ]
  // }

  const appState = await getAppState(req.originalUrl);

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
