import { fonts } from '../constants';

const fallBack = 'font-display: swap;';

export const fontsCss = `
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
