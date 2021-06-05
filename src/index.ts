import expressApp from './app';
import { connectDB, loadMiddlewares, startServer } from './utils';

const main = async () => {
  await connectDB();

  loadMiddlewares({ expressApp });

  startServer({ expressApp });
};

main();
