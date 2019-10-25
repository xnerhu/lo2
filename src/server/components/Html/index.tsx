import * as React from 'react';

import { IAppState } from '~/interfaces'; import { fonts } from '~/renderer/constants';

interface Props {
  scripts?: string[];
  state?: IAppState;
  styleElement?: any;
  children?: any;
}

const fontsCss = `
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: url(${fonts.robotoLight}) format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(${fonts.robotoRegular}) format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url(${fonts.robotoMedium}) format('woff2');
  }
`.replace(/\n|\s/g, '');

export const Html = ({ scripts, state, styleElement, children }: Props) => {
  const appState = JSON.stringify(state || {});

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="plo2, opole, lo2, dwójka, dwojka, publiczne, liceum, drugie liceum, drugie, konopicka, solaris" />
        <meta name="description" content="Publiczne Liceum Ogólnokształcące nr 2 w Opolu" />
        <meta name="og:title" property="og:title" content="PLO2" />
        <meta name="og:description" property="og:description" content="Publiczne Liceum Ogólnokształcące nr 2 w Opolu" />
        <meta name="og:image" property="og:image" content="http://www.lo2.opole.pl/static/banner.png" />
        <meta property="og:url" content="http://www.lo2.opole.pl/" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="kqoyKSVPjg08It3qpIJjnSj-iMvE4KF5ZJNwF8QnwUg" />
        <meta name="author" content="Mikołaj Palkiewicz" />
        <title>PLO II - Opole</title>
        <style type="text/css" dangerouslySetInnerHTML={{ __html: fontsCss }} />
        {styleElement}
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `window.__APP_STATE__=${appState}` }} />
      </head>
      <body>
        <noscript>
          Musisz włączyć JavaScript w przeglądarce, aby strona poprawnie się załadowała.
          <a href='https://pomoc.poczta.interia.pl/news-jak-wlaczyc-obsluge-javascript-w-przegladarce,nId,2136014'>Tutaj znajdziesz, co dokładnie zrobić.</a>
        </noscript>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {scripts.map(r => `/static/${r}`).map(src => (
          <script key={src} src={src} type="text/javascript" async />
        ))}
      </body>
    </html>
  );
}
