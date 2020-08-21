import { Connection, createConnection } from 'typeorm';

import { ENTITY_LIST } from '../entities';

export class DbService {
  public connection: Connection;

  public async start() {
    this.connection = await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '!#twojstary123',
      database: 'lo2',
      synchronize: true,
      entities: ENTITY_LIST,
    });
  }
}
