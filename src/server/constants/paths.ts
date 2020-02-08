import { resolve, join } from 'path';

export const STATIC_PATH = resolve('static');

export const BUILD_PATH = join('build/client', 'static');

export const NEWS_IMAGES_PATH = resolve(STATIC_PATH, 'news');
