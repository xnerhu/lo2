import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const {
  NODE_ENV,
  PORT,
  MONGODB_URI,
  TOKEN_SECRET,
  TOKEN_EXPIRATION_TIME,
  SHORT_ARTICLE_LENGTH,
  ARTICLES_PER_PAGE,
  HOSTNAME,
} = process.env;

export const config = {
  dev: NODE_ENV === 'development',
  port: parseInt(PORT),
  clientDirectory: resolve('build/client/static'),
  staticDirectory: resolve('static'),
  statsFile: resolve('build/client/static/loadable-stats.json'),
  mongodbURI: MONGODB_URI,
  tokenSecret: TOKEN_SECRET,
  tokenExpirationTime: parseInt(TOKEN_EXPIRATION_TIME),
  shortArticleLength: parseInt(SHORT_ARTICLE_LENGTH),
  articlesPerPage: parseInt(ARTICLES_PER_PAGE),
  hostname: HOSTNAME,
};
