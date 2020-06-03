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
  MAX_IMAGE_UPLOAD_SIZE,
} = process.env;

export const config = {
  dev: NODE_ENV === 'development',
  port: parseInt(PORT),
  clientDirectory: resolve('build/client/static'),
  staticDirectory: resolve('static'),
  workerPath: resolve('build/server/worker.js'),
  articleImagesPath: resolve('static/articles'),
  mongodbURI: MONGODB_URI,
  tokenSecret: TOKEN_SECRET,
  tokenExpirationTime: parseInt(TOKEN_EXPIRATION_TIME),
  shortArticleLength: parseInt(SHORT_ARTICLE_LENGTH),
  articlesPerPage: parseInt(ARTICLES_PER_PAGE),
  hostname: HOSTNAME,
  maxImageUploadSize: parseInt(MAX_IMAGE_UPLOAD_SIZE),
};
