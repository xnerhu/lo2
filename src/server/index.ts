import fastify from 'fastify';
import chalk from 'chalk';

import { config } from './constants/config';
import useFastify from './loaders/fastify';
import useMongoose from './loaders/mongoose';
import useControllers from './controllers';

async function init() {
  const app = fastify({ ignoreTrailingSlash: true });

  useFastify(app);
  await useControllers(app);
  useMongoose();

  app.listen(config.port, (err) => {
    if (err) throw err;

    console.log(
      `${chalk.cyanBright.bold('Server is running at')} ${chalk.greenBright(
        `http://localhost:${config.port}`,
      )}`,
    );
  });
}

init();
