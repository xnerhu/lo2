import { platform } from 'os';
import knex, { MySqlConnectionConfig } from 'knex';

import { HomeStore } from './home';

export class Database {
  public client: knex;

  public home = new HomeStore();

  protected _getConfig() {
    const {
      MYSQL_HOST,
      MYSQL_PORT,
      MYSQL_USER,
      MYSQL_PASSWORD,
      MYSQL_DB_NAME,
    } = process.env;

    const config: MySqlConnectionConfig = {
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      port: parseInt(MYSQL_PORT),
      database: MYSQL_DB_NAME,
    };

    if (platform() === 'linux') {
      config.socketPath = '/var/run/mysqld/mysqld.sock';
    }

    return config;
  }

  public async connect() {
    this.client = knex({
      client: 'mysql',
      connection: this._getConfig(),
    });
  }
}

export default new Database();
