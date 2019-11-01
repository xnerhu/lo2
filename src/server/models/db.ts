import { Connection, ConnectionConfig, createConnection } from 'mysql';

import { IQuery } from '../interfaces';

export class Database {
  public client: Connection;

  public connect(config: ConnectionConfig) {
    return new Promise((resolve, reject) => {
      this.client = createConnection(config);

      this.client.connect(err => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  public query<T>(query: IQuery): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.client.query(query, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
}

export default new Database();
