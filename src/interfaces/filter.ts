export interface IArticleFilter {
  page?: number;
  limit?: number;
  category?: string;
  excluded?: string;
  thumbnail?: boolean;
}
