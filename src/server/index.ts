import fastify from 'fastify';

import config from './config';
import useFastify from './loaders/fastify';
import chalk from 'chalk';

async function init() {
  const app = fastify();

  useFastify(app);

  app.get('/', (req, res) => {
    res.send({ message: 'hello world' });
  });

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
