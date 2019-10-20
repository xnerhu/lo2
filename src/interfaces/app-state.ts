import { INewsBase } from './news';

export interface IAppState {
  sliderItems?: string[];
  shortNews?: INewsBase[];
}
