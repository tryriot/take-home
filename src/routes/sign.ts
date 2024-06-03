import { Router, Request, Response } from 'express';
import { generateHmacSignature } from '../services/signatureService';

export const signRouter = Router();

signRouter.post('/', (req: Request, res: Response) => {
    const signature = generateHmacSignature(req.body, 'mysecret');
    res.json({ signature });
});
