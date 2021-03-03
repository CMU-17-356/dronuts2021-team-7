import {
  Client, createRestAppClient,
  givenHttpServerConfig
} from '@loopback/testlab';
import {Dronuts2021Team7Application} from '../..';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    host: 127.0.0.1,
    port: 8080,
  });

  const app = new Dronuts2021Team7Application({
    rest: restConfig,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: Dronuts2021Team7Application;
  client: Client;
}
