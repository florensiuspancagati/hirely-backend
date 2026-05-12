import 'dotenv/config';
import app from './server/index.js';
import mongodbConnection from './configs/mongodb.js'

const port = process.env.PORT;
const host = process.env.HOST;

const startServer = async() => {
  await mongodbConnection();

  app.listen(port, () => {
    console.log(`SERVER BERJALAN DI http://${host}:${port}`);
  });
};

startServer();