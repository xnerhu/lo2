import { Db } from 'mongodb';
import { connect } from 'mongoose';

import config from '~/server/config';

export let db: Db;

export default async () => {
  const connection = await connect(config.mongodbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  db = connection.connection.db;
};
