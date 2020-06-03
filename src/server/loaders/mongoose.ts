import { Db } from 'mongodb';
import { connect } from 'mongoose';

import { config } from '../constants/config';

export let db: Db;

export default async () => {
  const connection = await connect(config.mongodbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  db = connection.connection.db;
};
