import config from 'config';
import connect from './_utils/connect';
import logger from './_utils/logger';
import createServer from './_utils/server';

const port = config.get<number>('port');

const app = createServer();

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();
 
});
