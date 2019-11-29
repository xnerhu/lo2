import { Client, IConfig, Database as SQLDatabase, Table } from 'sql-next';
import { platform } from 'os';

import { IGalleryAlbum, INews, INewsCategory, IUser } from '~/interfaces';

export class Database {
  public client = new Client();
  public sql: SQLDatabase;

  public news: Table<INews>;
  public newsCategories: Table<INewsCategory>;
  public gallery: Table<IGalleryAlbum>;
  public users: Table<IUser>;

  protected _getConfig() {
    const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD } = process.env;

    const config: IConfig = {
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      port: parseInt(MYSQL_PORT),
    }

    if (platform() === 'linux') {
      config.socketPath = '/var/run/mysqld/mysqld.sock';
    }

    return config;
  }

  public async connect() {
    const { MYSQL_DB_NAME } = process.env;
    const config = this._getConfig();

    try {
      await this.client.connect(config);
      console.log('Connected to db!');
    } catch (error) {
      console.log('Error occured while connecting to db', error);
    }

    this.sql = this.client.db(MYSQL_DB_NAME);
    this._prepareTables();
  }

  protected _prepareTables() {
    this.news = this.sql.table('news');
    this.newsCategories = this.sql.table('news-categories');
    this.gallery = this.sql.table('gallery-albums');
    this.users = this.sql.table('users');
  }
}

export default new Database();
