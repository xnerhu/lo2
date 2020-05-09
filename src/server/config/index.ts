import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const { PORT, MONGODB_URI } = process.env;

export default {
  port: parseInt(PORT),
  clientDirectory: resolve('build/client/static'),
  staticDirectory: resolve('static'),
  statsFile: resolve('build/client/static/loadable-stats.json'),
  mongodbURI: MONGODB_URI,
};
