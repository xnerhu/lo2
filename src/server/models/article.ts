import mongoose from 'mongoose';

import { IArticle } from '~/interfaces';

const Article = new mongoose.Schema(
  {
    label: {
      type: String,
      required: [true],
      index: true,
    },

    title: {
      type: String,
      required: [true],
    },

    content: {
      type: String,
      required: [true],
    },

    hasImage: {
      type: Boolean,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'article-categories',
    },

    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'article-categories',
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IArticle & mongoose.Document>(
  'articles',
  Article,
);
