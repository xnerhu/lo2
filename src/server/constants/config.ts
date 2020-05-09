import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const { PORT, MONGODB_URI, TOKEN_SECRET, TOKEN_EXPIRATION_TIME } = process.env;

export const config = {
  port: parseInt(PORT),
  clientDirectory: resolve('build/client/static'),
  staticDirectory: resolve('static'),
  statsFile: resolve('build/client/static/loadable-stats.json'),
  mongodbURI: MONGODB_URI,
  tokenSecret: TOKEN_SECRET,
  tokenExpirationTime: TOKEN_EXPIRATION_TIME,
};
