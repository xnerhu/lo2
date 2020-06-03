import { fontsCss } from './fonts';

const scriptView = (data: string) => {
  if (!data) return '';

  data = data.replace(/</g, '\\u003c');

  return `<script type="text/javascript">window.__APP_STATE__= ${data}</script>`;
};

export const htmlViewStart = `
  <!DOCTYPE html>
  <html lang="pl">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content="plo2, opole, lo2, dwójka, dwojka, publiczne, liceum, drugie liceum, drugie, konopickiej, dwujęzyczna" />
      <meta name="og:image" property="og:image" content="/static/banner.jpg" />
      <meta name="robots" content="index, follow" />
      <meta name="google-site-verification" content="kqoyKSVPjg08It3qpIJjnSj-iMvE4KF5ZJNwF8QnwUg" />
      <meta name="author" content="Mikołaj Palkiewicz" />
      <link rel="icon" type="image/png" href="/static/favicon.png" />
      <title>Publiczne Liceum Ogólnokształcące Nr 2 w Opolu z Oddziałami Dwujęzycznymi im. Marii Konopnickiej w Opolu.</title>
      <style type="text/css">${fontsCss}</style>
    </head>
    <body>
      <noscript>
        Musisz włączyć JavaScript w przeglądarce, aby strona poprawnie się załadowała.
        <a href="https://pomoc.poczta.interia.pl/news-jak-wlaczyc-obsluge-javascript-w-przegladarce,nId,2136014">
          Tutaj znajdziesz, co dokładnie zrobić.
        </a>
      </noscript>
      <main id="app">
  `;

interface Props {
  scripts: string;
  state?: string;
}

export const htmlViewEnd = ({ scripts, state }: Props) => {
  return `</main>${scriptView(state)}${scripts}</body></html>`;
};
