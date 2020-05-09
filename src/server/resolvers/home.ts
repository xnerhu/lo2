import { IHomePageData } from '~/interfaces';

export default async (): Promise<IHomePageData> => {
  return {
    sliderItems: [],
    articles: [],
    categories: [],
  };
};
