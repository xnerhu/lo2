import { INews } from './news';
import { IPress } from './press';
import { ITeachersSection } from './teachers';

export interface IAppState {
  sliderItems?: string[];
  shortNews?: INews[];
  pressItems?: IPress[];
  teachersItems?: ITeachersSection[];
}
