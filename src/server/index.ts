import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import chalk from 'chalk';
import { config } from 'dotenv';
import { platform } from 'os';
import { ConnectionConfig } from 'mysql';

import db from './models/db';

config();

import controllers from './controllers';

const app = express();

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(controllers);

const { PORT } = process.env;

app.listen(PORT, async () => {
  const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB_NAME } = process.env;

  const config: ConnectionConfig = {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB_NAME,
    port: parseInt(MYSQL_PORT),
  }

  if (platform() === 'linux') {
    config.socketPath = '/var/run/mysqld/mysqld.sock';
  }

  await db.connect(config);

  console.log(`${chalk.cyanBright.bold('Server is running at')} ${chalk.greenBright(`http://localhost:${PORT}`)}`);
});

export default app;
