export interface IInsertArticleData {
  title?: string;
  body?: string;
  categoryId?: number;
  authorId?: number;
  image?: Express.Multer.File;
}

export interface IEditArticleData extends IInsertArticleData {
  label?: string;
  deleteImage?: boolean;
}
