import { ServerService } from './services/server';
import { DbService } from './services/db';

export class App {
  public static instance = new App();

  public server = new ServerService();

  public db = new DbService();

  public async start() {
    this.server.start();
    this.db.start();
  }
}
