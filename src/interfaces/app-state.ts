import { INews } from './news';
import { IPress } from './press';

export interface IAppState {
  sliderItems?: string[];
  shortNews?: INews[];
  pressItems?: IPress[];
}
