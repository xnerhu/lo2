import { platform } from 'os';
import knex, { MySqlConnectionConfig } from 'knex';

export let db: knex;

const getConfig = () => {
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
};

export const connect = () => {
  db = knex({
    client: 'mysql',
    connection: getConfig(),
  });
};
