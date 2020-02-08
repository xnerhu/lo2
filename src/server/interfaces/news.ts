export interface IInsertArticleData {
  title: string;
  body: string;
  categoryId: number;
  authorId?: number;
  image: Express.Multer.File;
}
