import { INews, INewsChunk, INewsCategory } from './news';
import { IPersonnelSection } from './personnel';

export interface IHomePagePacket {
  sliderItems?: string[];
  news?: INews[];
}

export interface INewsPagePacket {
  news?: INewsChunk;
  categories?: INewsCategory[];
}

export interface IArticlePagePacket {
  data?: INews;
  error?: boolean;
  proposed?: INews[];
  editable?: boolean;
}

export interface IPersonnelPacket {
  sections?: IPersonnelSection[];
  sliderItems?: string[];
}

export interface IAddArticlePacket {
  categories?: INewsCategory[];
}
