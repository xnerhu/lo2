export interface IArticle {
  id?: number;
  label?: string;
  title?: string;
  content?: string;
  image?: string;
  hasImage?: boolean;
  createdAt?: string;
  categoryId?: number;
  authorId?: number;
}

export interface IArticleCategory {
  id?: number;
  name?: string;
  label?: string;
}

export interface IArticleFilter {
  page?: number;
  limit?: number;
  category?: string;
  excluded?: string;
}

export interface IArticleListBundle {
  articles?: IArticle[];
  categories?: IArticleCategory[];
  nextPage?: boolean;
}
