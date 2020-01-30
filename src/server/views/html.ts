import { IAppState } from '~/interfaces';
import { fonts } from '~/renderer/constants';

const fallBack = 'font-display: fallback;';

const fontsCss = `
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(${fonts.robotoRegular}) format('woff2');
    ${fallBack}
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url(${fonts.robotoMedium}) format('woff2');
    ${fallBack}
  }
`.replace(/\n|\s/g, '');

export const htmlStartView = (state: IAppState) => {
  const appState = state ? JSON.stringify(state) : '{}';

  return `
   <!DOCTYPE html>
    <html lang="pl">
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
        <link rel="icon" type="image/png" href="/static/favicon.png" />
        <title>Publiczne Liceum Ogólnokształcące Nr II im. Marii Konopnickiej w Opolu</title>
        <style type="text/css">${fontsCss}</style>
        <script type="text/javascript">window.__APP_STATE__=${appState}</script>
      </head>
      <body>
        <noscript>
          Musisz włączyć JavaScript w przeglądarce, aby strona poprawnie się załadowała.
          <a href="https://pomoc.poczta.interia.pl/news-jak-wlaczyc-obsluge-javascript-w-przegladarce,nId,2136014">
            Tutaj znajdziesz, co dokładnie zrobić.
          </a>
        </noscript>
        <main id="app">`;
};

export const htmlEndView = (scripts: React.ReactNode) => {
  return `</main>${scripts}</body></html>`;
};
