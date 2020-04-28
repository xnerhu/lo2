import fastify from 'fastify';
import chalk from 'chalk';

import config from './config';
import useFastify from './loaders/fastify';
import useControllers from './controllers';

async function init() {
  const app = fastify();

  useFastify(app);
  useControllers(app);

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
