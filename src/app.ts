import express from 'express';
import bodyParser from 'body-parser';
import { encryptionRouter } from './routes/encryption';
import { signRouter } from './routes/sign';
import { verifyRouter } from './routes/verify';

const app = express();

app.use(bodyParser.json());
app.use('/', encryptionRouter);
app.use('/sign', signRouter);
app.use('/verify', verifyRouter);

export default app;
