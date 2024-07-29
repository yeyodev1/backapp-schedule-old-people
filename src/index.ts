import 'dotenv/config'

import dbConnect from './config/mongo';
import createApp from './app';


async function main(): Promise<void> {
  await dbConnect();

  const app = createApp();

  const port: number | string = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log(`Server is running att http://localhost:${port}`)
  });
}

main();
