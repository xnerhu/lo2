import { ISliderItem } from './slider';
import { INewsBase } from './news';

export interface IAppState {
  sliderItems?: ISliderItem[];
  shortNews?: INewsBase[];
}
