import express from 'express';
import cors from 'cors';

import routes from '../routes/index.js'
// import eror handler

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/public', express.static('public'));

app.use('/hirely-api/v1', routes);

// app use eror handler

export default app;