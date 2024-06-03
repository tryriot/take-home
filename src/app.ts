import express from 'express';
import bodyParser from 'body-parser';
import { encryptRouter } from './routes/encrypt';
import { decryptRouter } from './routes/decrypt';
import { signRouter } from './routes/sign';
import { verifyRouter } from './routes/verify';

const app = express();

app.use(bodyParser.json());
app.use('/encrypt', encryptRouter);
app.use('/decrypt', decryptRouter);
app.use('/sign', signRouter);
app.use('/verify', verifyRouter);

export default app;
