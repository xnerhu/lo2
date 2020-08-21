import fastify, { FastifyInstance } from 'fastify';
import compress from 'fastify-compress';
import cors from 'fastify-cors';
import cookies from 'fastify-cookie';
import helmet from 'fastify-helmet';
import body from 'fastify-formbody';
import staticDir from 'fastify-static';
import chalk from 'chalk';

import { CONFIG } from '~/server/common/constants';
import controllers from '~/server/main/controllers';

export class ServerService {
  public instance: FastifyInstance;

  public start() {
    this.instance = fastify({ ignoreTrailingSlash: true, maxParamLength: 256 });

    this.registerPlugins();
    this.registerControllers();
    this.listen();
  }

  private registerPlugins() {
    this.instance
      .register(helmet, { noSniff: false })
      .register(cors)
      .register(body)
      .register(cookies)
      .register(compress)
      .register(staticDir, {
        prefix: '/static/bundle',
        root: CONFIG.clientDirectory,
        decorateReply: false,
      })
      .register(staticDir, {
        prefix: '/static',
        root: CONFIG.staticDirectory,
        decorateReply: false,
      });
  }

  private registerControllers() {
    controllers(this.instance);
  }

  private listen() {
    const { port, address } = CONFIG;

    this.instance.listen(port, address, (err) => {
      if (err) throw err;

      console.log(
        `${chalk.cyanBright.bold('Server is running at')} ${chalk.greenBright(
          `http://localhost:${port}`,
        )}`,
      );
    });
  }
}
