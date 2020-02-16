import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import chalk from 'chalk';
import { config } from 'dotenv';

config();

import db from './models/db';
import controllers from './controllers';

const app = express();

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(controllers);

const { PORT } = process.env;

app.listen(PORT, async () => {
  await db.connect();

  console.log(
    `${chalk.cyanBright.bold('Server is running at')} ${chalk.greenBright(
      `http://localhost:${PORT}`,
    )}`,
  );
});

export default app;
