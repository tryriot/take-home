import express from 'express';
import bodyParser from 'body-parser';
import { encryptRouter } from './routes/encrypt';

const app = express();

app.use(bodyParser.json());
app.use('/encrypt', encryptRouter);

export default app;
