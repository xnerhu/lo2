import { fonts } from '../constants';
import { config } from '../constants';

const fallBack = 'font-display: swap;';

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

export default (
  rendered: string,
  styleTags: string,
  scriptTags: string,
  appState: any,
) => {
  let str = `
  <!DOCTYPE html>
  <html lang="pl">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content="plo2, opole, lo2, dwójka, dwojka, publiczne, liceum, drugie liceum, drugie, konopickiej, dwujęzyczna" />
      <meta name="og:image" property="og:image" content="/static/banner.jpg" />
      <meta name="description" content="Oficjalna strona Dwójki." />
      <meta name="robots" content="index, follow" />
      <meta name="google-site-verification" content="kqoyKSVPjg08It3qpIJjnSj-iMvE4KF5ZJNwF8QnwUg" />
      <meta name="author" content="Mikołaj Palkiewicz" />
      <link rel="icon" type="image/png" href="/static/favicon.png" />
      <title>Publiczne Liceum Ogólnokształcące Nr 2 w Opolu z Oddziałami Dwujęzycznymi im. Marii Konopnickiej w Opolu.</title>
      <style type="text/css">${fontsCss}</style>
      ${styleTags}
    </head>
    <body>
      <noscript>
        Musisz włączyć JavaScript w przeglądarce, aby strona poprawnie się załadowała.
        <a href="https://pomoc.poczta.interia.pl/news-jak-wlaczyc-obsluge-javascript-w-przegladarce,nId,2136014">
          Tutaj znajdziesz, co dokładnie zrobić.
        </a>
      </noscript>
      <main id="app">${rendered}</main>
      <script type="text/javascript">window.__APP_STATE__= ${JSON.stringify(
        appState ?? {},
      ).replace(/</g, '\\u003c')}</script>
      ${scriptTags}
    </body>
  </html>`;

  if (!config.dev) {
    str = str.replace(/[\r\n]+|[\s]{2,}/g, '');
  }

  return str;
};
