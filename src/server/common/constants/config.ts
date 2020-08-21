import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, ADDRESS, PORT, HOSTNAME } = process.env;

export const CONFIG = {
  dev: NODE_ENV === 'development',
  address: ADDRESS,
  port: parseInt(PORT),
  clientDirectory: resolve('build/client/static'),
  staticDirectory: resolve('static'),
  hostname: HOSTNAME,
};
