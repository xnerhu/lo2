export interface IPostMessage {
  type?: 'article-editor';
  data?: any;
}

export interface IPostMessageArticleEditor extends IPostMessage {
  action?: 'save' | 'cancel';
  data?: string;
}
