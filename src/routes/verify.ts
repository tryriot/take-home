import { Router, Request, Response } from 'express';
import { verifyHmacSignature } from '../services/signatureService';

export const verifyRouter = Router();
const secretKey = 'mysecret';

verifyRouter.post('/', (req: Request, res: Response) => {
    const { signature, data } = req.body;

    if (verifyHmacSignature(data, signature, secretKey)) {
        res.sendStatus(204);
    } else {
        res.sendStatus(400);
    }
});
