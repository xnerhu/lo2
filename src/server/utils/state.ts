import { IAppState } from '~/interfaces';

import { getNewsCategories, getNewsChunk } from '../controllers/api/news';
import { getShortNews } from '../controllers/api/short-news';
import { getSliderItems } from '../controllers/api/slider';
import { getTeachers } from '../controllers/api/teachers';

export const getAppState = async (route: string): Promise<IAppState> => {
  if (route === '/') {
    const [shortNews, slider] = await Promise.all([getShortNews(), getSliderItems()]);

    return { shortNews, slider };
  } else if (route === '/news') {
    const [news, newsCategories] = await Promise.all([getNewsChunk({ getPages: true }), getNewsCategories()]);

    return { news, newsCategories };
  } else if (route === '/about/teachers') {
    const teachers = await getTeachers();

    return { teachers };
  }

  return {};
}
