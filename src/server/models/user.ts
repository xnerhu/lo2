import mongoose from 'mongoose';

import { IUser } from '~/interfaces';

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true],
    },

    password: {
      type: String,
      required: [true],
    },

    firstName: {
      type: String,
      required: [true],
    },

    lastName: {
      type: String,
      required: [true],
    },

    image: {
      type: String,
    },

    admin: {
      type: Boolean,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUser & mongoose.Document>('users', User);
