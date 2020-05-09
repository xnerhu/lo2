import mongoose from 'mongoose';

import { IArticleCategory } from '~/interfaces';

const ArticleCategory = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },

  label: {
    type: String,
    required: [true],
    index: true,
  },
});

export default mongoose.model<IArticleCategory & mongoose.Document>(
  'article-categories',
  ArticleCategory,
);
