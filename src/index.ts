import expressApp from './app';
import { connectDB, loadMiddlewares, startServer } from './helpers';

const main = async () => {
  await connectDB();

  startServer({ expressApp });

  loadMiddlewares({ expressApp });
};

main();
