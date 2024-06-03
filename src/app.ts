import express from 'express';
import bodyParser from 'body-parser';
import { encryptionRouter } from './routes/encryption';
import { signatureRouter } from "./routes/signature";

const app = express();

app.use(bodyParser.json());
app.use('/', encryptionRouter);
app.use('/', signatureRouter);

export default app;
