import express from 'express';
import bodyParser from 'body-parser';
import { encryptRouter } from './routes/encrypt';
import { decryptRouter } from './routes/decrypt';

const app = express();

app.use(bodyParser.json());
app.use('/encrypt', encryptRouter);
app.use('/decrypt', decryptRouter);

export default app;