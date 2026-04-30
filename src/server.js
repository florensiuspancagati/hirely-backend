import app from './app.js';

const port = process.env.PORT || 3000;
const host = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

app.listen(port, () => {
  console.log(`SERVER BERJALAN DI http://${host}:${port}`);
});