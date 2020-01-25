import { INews, INewsCategory, IUser } from '~/interfaces';

export interface IDbNewsPacket {
  news: INews;
  'news-categories': INewsCategory;
  users: IUser;
}
