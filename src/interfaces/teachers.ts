export interface ITeachersSection {
  subject?: string;
  teachers?: ITeacher[];
}

export type ITeacher = string | [string, string];
