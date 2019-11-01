import { IAppState } from '~/interfaces';

import { getShortNews } from '../controllers/api/news';
import { getSliderItems } from '../controllers/api/slider';
import { getTeachers } from '../controllers/api/teachers';

export const getAppState = async (route: string): Promise<IAppState> => {
  if (route === '/') {
    const [shortNews, slider] = await Promise.all([getShortNews(), getSliderItems()]);

    return { shortNews, slider };
  }

  if (route === '/about/teachers') {
    const teachers = await getTeachers();

    return { teachers };
  }

  return {};
}
